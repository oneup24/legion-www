/**
 * Rebuild the LegionOne cube mark as real vector geometry.
 *
 * The brand sheet is flat vector artwork, so the mark can be recovered
 * exactly rather than approximated: every facet of the cube is a straight-edged
 * polygon, so a convex hull of each connected component reproduces it
 * exactly. Components that are not convex fall back to a marching-squares
 * contour that is then simplified with Douglas-Peucker.
 *
 * The white seams between the facets and the white halo around the centre
 * hexagon are simply the gaps between the rebuilt polygons, so they stay
 * transparent without any extra work.
 *
 * Usage: node scripts/trace-logo.mjs <brandSheet> [outDir]
 */
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(
  "/Users/user/Legionone/node_modules/.pnpm/sharp@0.35.4_@types+node@22.20.4/node_modules/sharp"
);

const SHEET =
  process.argv[2] ||
  "/Users/user/.minimax/v2/assets/2026/11/07/00-17-49-938-asset_20261107-001749-938_33bb2933121b_3cd6ebb4-LegionOne.png";
const OUT = process.argv[3] || "public/brand";

const BOX = { left: 315, top: 137, right: 647, bottom: 513 };

/* the brand colours printed on the sheet */
const INK = [29, 29, 31];
const BLUE = [1, 102, 230];

const { data, info } = await sharp(SHEET)
  .extract({
    left: BOX.left,
    top: BOX.top,
    width: BOX.right - BOX.left + 1,
    height: BOX.bottom - BOX.top + 1,
  })
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

/* -------------------------------------------------------------------------- */
/* classify                                                                    */
/* -------------------------------------------------------------------------- */

/** For every pixel: which brand colour it belongs to, and at what coverage. */
function classify(target) {
  const reach = 255 - Math.min(...target);
  const mask = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const mn = Math.min(r, g, b);
      let a = (255 - mn) / reach;
      a = a < 0 ? 0 : a > 1 ? 1 : a;
      if (a < 0.5) continue;
      const err =
        Math.abs(r - (target[0] * a + 255 * (1 - a))) +
        Math.abs(g - (target[1] * a + 255 * (1 - a))) +
        Math.abs(b - (target[2] * a + 255 * (1 - a)));
      if (err > 70) continue;
      mask[y * width + x] = 1;
    }
  }
  return mask;
}

/* -------------------------------------------------------------------------- */
/* connected components (4-connectivity)                                       */
/* -------------------------------------------------------------------------- */

function components(mask) {
  const labels = new Int32Array(mask.length).fill(-1);
  const stack = [];
  let next = 0;
  for (let p = 0; p < mask.length; p++) {
    if (!mask[p] || labels[p] !== -1) continue;
    labels[p] = next;
    stack.length = 0;
    stack.push(p);
    while (stack.length) {
      const c = stack.pop();
      const cx = c % width;
      const cy = (c / width) | 0;
      const around = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1],
      ];
      for (const [nx, ny] of around) {
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const np = ny * width + nx;
        if (mask[np] && labels[np] === -1) {
          labels[np] = next;
          stack.push(np);
        }
      }
    }
    next++;
  }
  const groups = [];
  for (let p = 0; p < mask.length; p++) {
    if (labels[p] < 0) continue;
    (groups[labels[p]] ||= []).push(p);
  }
  return groups;
}

/* -------------------------------------------------------------------------- */
/* geometry                                                                    */
/* -------------------------------------------------------------------------- */

const cross = (o, a, b) =>
  (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

/** Andrew's monotone chain convex hull. */
function hull(points) {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (pts.length < 3) return pts;
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0)
      lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0)
      upper.pop();
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

function polyArea(points) {
  let a = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const q = points[(i + 1) % points.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return Math.abs(a) / 2;
}

/** Douglas-Peucker. */
function rdp(points, eps) {
  if (points.length < 3) return points;
  let maxD = 0;
  let idx = 0;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy);
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const d =
      len < 1e-9
        ? Math.hypot(px - ax, py - ay)
        : Math.abs(dy * px - dx * py + bx * ay - by * ax) / len;
    if (d > maxD) {
      maxD = d;
      idx = i;
    }
  }
  if (maxD <= eps) return [points[0], points[points.length - 1]];
  const left = rdp(points.slice(0, idx + 1), eps);
  const right = rdp(points.slice(idx), eps);
  return left.slice(0, -1).concat(right);
}

/**
 * Boundary of a component, as closed rings of corner points.
 *
 * A component is a union of unit pixels, so its exact boundary is the set of
 * pixel sides that face outwards. Walking those directed sides yields a
 * rectilinear ring that traces the real shape - including the notches that a
 * convex hull would swallow.
 */
function pixelRings(cells) {
  const inSet = new Set(cells);
  const out = new Map();
  const add = (a, b) => {
    const k = `${a[0]},${a[1]}`;
    if (!out.has(k)) out.set(k, []);
    out.get(k).push(b);
  };
  for (const p of cells) {
    const x = p % width;
    const y = (p / width) | 0;
    if (!inSet.has((y - 1) * width + x)) add([x, y], [x + 1, y]);
    if (!inSet.has(y * width + x + 1)) add([x + 1, y], [x + 1, y + 1]);
    if (!inSet.has((y + 1) * width + x)) add([x + 1, y + 1], [x, y + 1]);
    if (!inSet.has(y * width + x - 1)) add([x, y + 1], [x, y]);
  }

  const rings = [];
  const spent = new Set();
  for (const startKey of [...out.keys()]) {
    if (spent.has(startKey)) continue;
    const ring = [];
    let cur = startKey;
    let guard = 0;
    while (guard++ < 500000) {
      const outs = out.get(cur);
      if (!outs || !outs.length) break;
      const next = outs.shift();
      ring.push(next);
      const nk = `${next[0]},${next[1]}`;
      if (nk === startKey) {
        spent.add(cur);
        break;
      }
      spent.add(cur);
      cur = nk;
    }
    if (ring.length > 4) rings.push(ring);
  }
  return rings;
}

/**
 * Simplify a closed ring into straight edges.
 *
 * The ring is cut at two anchors and each half is simplified on its own, so
 * the result stays closed.
 */
function simplifyRing(ring, eps) {
  if (ring.length < 4) return ring;
  let a = 0;
  for (let i = 1; i < ring.length; i++) {
    if (ring[i][1] < ring[a][1] || (ring[i][1] === ring[a][1] && ring[i][0] < ring[a][0]))
      a = i;
  }
  let b = 0;
  let far = -1;
  for (let i = 0; i < ring.length; i++) {
    const d = Math.hypot(ring[i][0] - ring[a][0], ring[i][1] - ring[a][1]);
    if (d > far) {
      far = d;
      b = i;
    }
  }
  const half = (from, to) => {
    const seg = [];
    for (let i = from; ; i = (i + 1) % ring.length) {
      seg.push(ring[i]);
      if (i === to) break;
    }
    return seg;
  };
  const first = rdp(half(a, b), eps);
  const second = rdp(half(b, a), eps);
  return first.concat(second.slice(1, -1));
}

/* -------------------------------------------------------------------------- */
/* build                                                                       */
/* -------------------------------------------------------------------------- */

function polygonsFor(target) {
  const mask = classify(target);
  const groups = components(mask).filter((c) => c.length > 60);
  const polys = [];
  const report = [];

  for (const cells of groups) {
    // pixel corners, so the polygon sits on the outside of the pixels
    const corners = [];
    for (const p of cells) {
      const x = p % width;
      const y = (p / width) | 0;
      corners.push([x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]);
    }
    const h = hull(corners);
    const hullArea = polyArea(h);
    const pixelArea = cells.length;
    const fill = hullArea / pixelArea;

    if (fill > 0.965 && fill < 1.04) {
      // convex: the hull is the shape
      polys.push({ points: rdp(h, 0.6), convex: true });
      report.push(`convex   pixels=${pixelArea} hull=${hullArea.toFixed(0)} fill=${fill.toFixed(3)} verts=${h.length}`);
    } else {
      // not convex: trace the real boundary
      const rings = pixelRings(cells).sort((a, b) => polyArea(b) - polyArea(a));
      const outer = simplifyRing(rings[0], 1.7);
      polys.push({ points: outer, convex: false, holes: rings.slice(1).map((r) => simplifyRing(r, 1.7)) });
      report.push(`contour  pixels=${pixelArea} hull=${hullArea.toFixed(0)} fill=${fill.toFixed(3)} verts=${outer.length} rings=${rings.length}`);
    }
  }
  return { polys, report };
}

const ink = polygonsFor(INK);
const blue = polygonsFor(BLUE);

console.log("ink components:");
ink.report.forEach((r) => console.log("  " + r));
console.log("blue components:");
blue.report.forEach((r) => console.log("  " + r));

/* ---- assemble the SVG ---- */

const toPath = (pts) =>
  pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ") + " Z";

const all = [...ink.polys, ...blue.polys];
let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;
for (const p of all) {
  for (const [x, y] of p.points) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
}
const artW = maxX - minX;
const artH = maxY - minY;
const SIZE = 512;
const PAD = 8;
const scale = (SIZE - PAD * 2) / Math.max(artW, artH);
const offX = (SIZE - artW * scale) / 2 - minX * scale;
const offY = (SIZE - artH * scale) / 2 - minY * scale;

const remap = (pts) =>
  pts.map(([x, y]) => [
    +( (x * scale + offX).toFixed(2)),
    +((y * scale + offY).toFixed(2)),
  ]);

const pathsFor = (polys) =>
  polys
    .flatMap((p) => [
      `<path d="${toPath(remap(p.points))}"/>`,
      ...(p.holes || []).map((h) => `<path d="${toPath(remap(h))}"/>`),
    ])
    .join("\n    ");

const inkPaths = pathsFor(ink.polys);
const bluePaths = pathsFor(blue.polys);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" role="img" aria-label="LegionOne">
  <g id="legion-cube" fill-rule="evenodd">
    <g fill="#1d1d1f">${inkPaths}</g>
    <g fill="#0166e6">${bluePaths}</g>
  </g>
</svg>
`;

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "legionone-mark.svg"), svg);
console.log(`\nlegionone-mark.svg written  (art ${artW.toFixed(0)}x${artH.toFixed(0)} px)`);

const preview = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync("/tmp/mark-svg-preview.png", preview);

const source = await sharp(SHEET)
  .extract({
    left: BOX.left,
    top: BOX.top,
    width: BOX.right - BOX.left + 1,
    height: BOX.bottom - BOX.top + 1,
  })
  .resize(SIZE, SIZE, { fit: "contain", background: "#ffffff" })
  .flatten({ background: "#ffffff" })
  .png()
  .toBuffer();

await sharp({
  create: { width: SIZE * 2 + 10, height: SIZE, channels: 4, background: "#ffffff" },
})
  .composite([
    { input: source, left: 0, top: 0 },
    { input: preview, left: SIZE + 10, top: 0 },
  ])
  .png()
  .toFile("/tmp/mark-svg-compare.png");
console.log("/tmp/mark-svg-compare.png  (left = source, right = rebuilt vector)");
