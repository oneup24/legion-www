/**
 * Detect the bounding boxes of every element on the LegionOne brand sheet.
 *
 * The sheet is flat artwork on a near-white background, so:
 *   1. mask every pixel that is not background
 *   2. label 8-connected components
 *   3. dilate the labels by a small radius so that the separate strokes of a
 *      letter (or of a single cube facet) merge back into one block
 *   4. report the merged blocks, so crops can be derived from measurements
 *      instead of eyeballed coordinates
 *
 * Usage: node scripts/detect-logo-regions.mjs <brandSheet> [radius]
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require(
  "/Users/user/Legionone/node_modules/.pnpm/sharp@0.35.4_@types+node@22.20.4/node_modules/sharp"
);

const sheet = process.argv[2];
const radius = Number(process.argv[3] || 18);

const { data, info } = await sharp(sheet)
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const BG = 236; // anything brighter than this on all channels counts as paper
const mask = new Uint8Array(width * height);
for (let p = 0; p < width * height; p++) {
  const i = p * channels;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r < BG || g < BG || b < BG) mask[p] = 1;
}

/* --- label raw components -------------------------------------------- */
function label(mask) {
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
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const np = ny * width + nx;
          if (mask[np] && labels[np] === -1) {
            labels[np] = next;
            stack.push(np);
          }
        }
      }
    }
    next++;
  }
  return { labels, count: next };
}

/* --- dilate label ids (morphological close) -------------------------- */
function dilate(labels, count, r) {
  const out = Int32Array.from(labels);
  const hits = new Map();
  const merge = new Map();
  const visit = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const id = out[y * width + x];
    if (id < 0) return;
    hits.set(id, (hits.get(id) || 0) + 1);
  };
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const id = labels[y * width + x];
      if (id < 0) continue;
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) visit(x + dx, y + dy);
      }
    }
  }
  // union-find over labels that co-occur inside a dilation window
  const parent = Array.from({ length: count }, (_, i) => i);
  const find = (a) => (parent[a] === a ? a : (parent[a] = find(parent[a])));
  const uni = (a, b) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent[rb] = ra;
  };
  const seen = new Map();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const id = labels[y * width + x];
      if (id < 0) continue;
      const bucket = [];
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const nid = labels[ny * width + nx];
          if (nid >= 0 && nid !== id) bucket.push(nid);
        }
      }
      for (const nid of bucket) {
        const key = Math.min(id, nid);
        const prev = seen.get(key);
        if (prev === undefined) seen.set(key, nid);
        else uni(prev, nid);
      }
    }
  }
  for (let p = 0; p < labels.length; p++) {
    if (labels[p] >= 0) out[p] = find(labels[p]);
  }
  return out;
}

const { labels, count } = label(mask);
const merged = dilate(labels, count, radius);

/* --- bounding boxes per merged group --------------------------------- */
const boxes = new Map();
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const id = merged[y * width + x];
    if (id < 0) continue;
    const b = boxes.get(id) || { left: x, top: y, right: x, bottom: y, n: 0 };
    if (x < b.left) b.left = x;
    if (y < b.top) b.top = y;
    if (x > b.right) b.right = x;
    if (y > b.bottom) b.bottom = y;
    b.n++;
    boxes.set(id, b);
  }
}

const regions = [...boxes.values()]
  .filter((b) => b.n > 400)
  .map((b) => ({
    left: b.left,
    top: b.top,
    right: b.right,
    bottom: b.bottom,
    w: b.right - b.left + 1,
    h: b.bottom - b.top + 1,
    n: b.n,
  }))
  .sort((a, b) => a.top - b.top || a.left - b.left);

console.log(
  `image ${width}x${height}  dilation r=${radius}  groups=${regions.length}\n`
);
for (const r of regions) {
  console.log(
    `L=${String(r.left).padStart(4)} T=${String(r.top).padStart(4)} ` +
      `R=${String(r.right).padStart(4)} B=${String(r.bottom).padStart(4)} ` +
      `W=${String(r.w).padStart(4)} H=${String(r.h).padStart(4)}  px=${r.n}`
  );
}

/* --- dominant colours per region ------------------------------------- */
for (const r of regions) {
  const counts = new Map();
  for (let y = r.top; y <= r.bottom; y++) {
    for (let x = r.left; x <= r.right; x++) {
      const i = (y * width + x) * channels;
      const rr = data[i];
      const gg = data[i + 1];
      const bb = data[i + 2];
      if (rr > 235 && gg > 235 && bb > 235) continue;
      const key = `${(rr / 16) | 0},${(gg / 16) | 0},${(bb / 16) | 0}`;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  const [cr, cg, cb] = top[0].split(",").map((v) => Number(v) * 16 + 8);
  r.dominant = `#${[cr, cg, cb]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`;
}
console.log("\ndominant colours");
for (const r of regions) console.log(`${r.dominant}  @ ${r.left},${r.top}`);
