/**
 * Split the LegionOne brand sheet into individual transparent PNG assets.
 *
 * The sheet is flat vector artwork rasterised into a 1920x1920 JPEG on a
 * near-white sheet. "Splitting" it honestly means recovering each element as
 * its own image with the paper knocked out, not redrawing it by hand.
 *
 * The pipeline for every element:
 *   1. crop the element's measured bounding box (see REGIONS below - the
 *      boxes come from scripts/detect-logo-regions.mjs, not from eyeballing)
 *   2. learn the element's own flat palette from the pixels it contains
 *   3. fit every pixel to (palette colour, coverage) against the white sheet:
 *        a = (255 - min(C)) / (255 - min(paletteColour))
 *      which is the correct alpha for artwork composited over white
 *   4. write the result as a straight-alpha PNG
 *
 * Knock-outs fall out for free: the white seams between the cube facets and
 * the white halo around the centre hexagon become transparent, as do the
 * white numerals printed inside the colour swatches.
 *
 * Usage: node scripts/split-logo.mjs <brandSheet> [outDir]
 */
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(
  "/Users/user/Legionone/node_modules/.pnpm/sharp@0.35.4_@types+node@22.20.4/node_modules/sharp"
);

const SRC =
  process.argv[2] ||
  "/Users/user/.minimax/v2/assets/2026/11/07/00-17-49-938-asset_20261107-001749-938_33bb2933121b_3cd6ebb4-LegionOne.png";
const OUT = process.argv[3] || "public/brand";

/* -------------------------------------------------------------------------- */
/* measured geometry                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Every box below was measured by scripts/detect-logo-regions.mjs, which
 * labels the connected components of the sheet and dilates them so that the
 * strokes of a letter merge back into one block.
 */
const REGIONS = {
  // canonical cube mark, top-left of the sheet
  mark: { left: 321, top: 143, right: 641, bottom: 507 },
  // "LegionOne" wordmark, top-right of the sheet
  wordmark: { left: 1070, top: 223, right: 1799, bottom: 361 },
  // the same wordmark as it sits in the stacked lockup (mid-left of sheet)
  wordmarkMid: { left: 115, top: 539, right: 843, bottom: 677 },
  // "PEOPLE. SYSTEM. PROGRESS" - the sheet sets it in three letter-spaced runs
  tagline: { left: 158, top: 711, right: 797, bottom: 733 },
  // the same cube again, inside the horizontal lockup
  markLockup: { left: 117, top: 1133, right: 437, bottom: 1497 },
  // the same wordmark again, inside the horizontal lockup
  wordmarkLockup: { left: 490, top: 1259, right: 1218, bottom: 1396 },
  // the same tagline again, inside the horizontal lockup
  taglineLockup: { left: 533, top: 1430, right: 1171, bottom: 1453 },
  // four alternate-colour builds of the cube
  variantBlueCyan: { left: 1382, top: 1078, right: 1703, bottom: 1443 },
  variantGold: { left: 1398, top: 1475, right: 1719, bottom: 1840 },
  variantGreen: { left: 957, top: 1495, right: 1277, bottom: 1860 },
  variantRed: { left: 516, top: 1507, right: 836, bottom: 1871 },
};

/** Offsets of each element inside the horizontal lockup (sheet coordinates). */
const LOCKUP_H = {
  canvas: { left: 117, top: 1133, right: 1218, bottom: 1497 },
  mark: { left: 117, top: 1133 },
  wordmark: { left: 490, top: 1259 },
  tagline: { left: 533, top: 1430 },
};

/** Offsets of each element inside the stacked lockup (sheet coordinates). */
const LOCKUP_V = {
  canvas: { left: 115, top: 143, right: 843, bottom: 733 },
  mark: { left: 321, top: 143 },
  wordmark: { left: 115, top: 539 },
  tagline: { left: 158, top: 711 },
};

/* -------------------------------------------------------------------------- */
/* source                                                                      */
/* -------------------------------------------------------------------------- */

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const at = (x, y) => {
  const i = (y * width + x) * channels;
  return [data[i], data[i + 1], data[i + 2]];
};

/* -------------------------------------------------------------------------- */
/* palette learning                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Learn the flat palette of a crop. The artwork only uses a handful of solid
 * fills, so clustering on a coarse quantisation grid and then averaging the
 * real pixels of each bucket recovers them exactly.
 */
function learnPalette(box, { minShare = 0.015, maxColours = 6 } = {}) {
  const buckets = new Map();
  let total = 0;

  for (let y = box.top; y <= box.bottom; y++) {
    for (let x = box.left; x <= box.right; x++) {
      const [r, g, b] = at(x, y);
      const mn = Math.min(r, g, b);
      const mx = Math.max(r, g, b);
      if (mn > 214 && mx - mn < 18) continue; // paper
      const key = ((r / 24) | 0) * 100 + ((g / 24) | 0) * 10 + ((b / 24) | 0);
      const bucket = buckets.get(key) || { n: 0, r: 0, g: 0, b: 0 };
      bucket.n++;
      bucket.r += r;
      bucket.g += g;
      bucket.b += b;
      buckets.set(key, bucket);
      total++;
    }
  }
  if (!total) return [];

  const strong = [...buckets.values()]
    .filter((b) => b.n / total >= minShare)
    .sort((a, b) => b.n - a.n)
    .slice(0, maxColours);

  // merge buckets that describe the same flat fill (JPEG chroma noise)
  const merged = [];
  for (const b of strong) {
    const mean = [b.r / b.n, b.g / b.n, b.b / b.n];
    const twin = merged.find((m) => dist(m.rgb, mean) < 46);
    if (twin) {
      const total2 = twin.n + b.n;
      twin.rgb = [
        (twin.rgb[0] * twin.n + mean[0] * b.n) / total2,
        (twin.rgb[1] * twin.n + mean[1] * b.n) / total2,
        (twin.rgb[2] * twin.n + mean[2] * b.n) / total2,
      ];
      twin.n = total2;
    } else {
      merged.push({ rgb: mean, n: b.n });
    }
  }
  return merged
    .sort((a, b) => b.n - a.n)
    .map((m) => ({
      rgb: snapBrand(m.rgb.map((v) => Math.round(v))),
      n: m.n,
    }));
}

const INK = [29, 29, 31];
const BLUE = [1, 102, 230];
const GREY = [135, 134, 139];
const WHITE = [255, 255, 255];

/**
 * The brand colours printed on the sheet. JPEG chroma subsampling shifts the
 * sampled blues by a step or two, so every detected fill is snapped back to
 * the documented value when it is close enough to be that fill.
 */
const BRAND = [
  { name: "ink", rgb: INK },
  { name: "blue", rgb: BLUE },
  { name: "grey", rgb: GREY },
];

function snapBrand(rgb) {
  let best = null;
  for (const b of BRAND) {
    const d = dist(rgb, b.rgb);
    if (!best || d < best.d) best = { d, rgb: b.rgb };
  }
  return best.d < 52 ? best.rgb : rgb.map((v) => Math.round(v));
}

const dist = (a, b) =>
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);

/* -------------------------------------------------------------------------- */
/* extraction                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Recover one element as straight-alpha RGBA.
 *
 * `remap` optionally rewrites palette entries, which is how the white and
 * monochrome variants of the mark are derived from the same artwork.
 */
function extract(box, { remap = null, pad = 3 } = {}) {
  const palette = learnPalette(box);
  const left = Math.max(0, box.left - pad);
  const top = Math.max(0, box.top - pad);
  const right = Math.min(width - 1, box.right + pad);
  const bottom = Math.min(height - 1, box.bottom + pad);
  const w = right - left + 1;
  const h = bottom - top + 1;

  const rgba = Buffer.alloc(w * h * 4, 0);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const [r, g, b] = at(left + x, top + y);
      const mn = Math.min(r, g, b);

      let best = null;
      for (let i = 0; i < palette.length; i++) {
        const p = palette[i].rgb;
        const reach = 255 - Math.min(p[0], p[1], p[2]);
        if (reach < 12) continue;
        let a = (255 - mn) / reach;
        a = a < 0 ? 0 : a > 1 ? 1 : a;
        // the rest of the colour has to agree too, otherwise this is the
        // wrong fill (or just paper)
        const err =
          Math.abs(r - (p[0] * a + 255 * (1 - a))) +
          Math.abs(g - (p[1] * a + 255 * (1 - a))) +
          Math.abs(b - (p[2] * a + 255 * (1 - a)));
        if (!best || err < best.err) best = { err, a, p, i };
      }

      if (!best || best.err > 96) continue; // paper

      const fill = remap ? remap(best.i, best.p) : best.p;
      const o = (y * w + x) * 4;
      rgba[o] = fill[0];
      rgba[o + 1] = fill[1];
      rgba[o + 2] = fill[2];
      rgba[o + 3] = Math.round(best.a * 255);
    }
  }

  return { rgba, width: w, height: h, palette };
}

/** Trim fully transparent margins away from an extracted element. */
function trim({ rgba, width, height }) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] > 8) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return { rgba, width, height };
  const w = maxX - minX + 1;
  const h = maxY - minY + 1;
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    rgba.copy(out, y * w * 4, (y + minY) * width * 4 + minX * 4, (y + minY) * width * 4 + (minX + w) * 4);
  }
  return { rgba: out, width: w, height: h };
}

const toPng = ({ rgba, width, height }) =>
  sharp(rgba, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toBuffer();

/**
 * Extract an element at its exact box size, untrimmed, so that it can be
 * composited back onto the sheet's own coordinates without drift.
 */
const piece = (box, opts = {}) => toPng(extract(box, { pad: 0, ...opts }));

/* -------------------------------------------------------------------------- */
/* compositing                                                                 */
/* -------------------------------------------------------------------------- */

/** Place transparent PNG buffers on a shared transparent canvas. */
async function compose(size, layers) {
  const composites = [];
  for (const l of layers) {
    const buf = await sharp(l.src).png().toBuffer();
    const meta = await sharp(buf).metadata();
    composites.push({
      input: buf,
      left: l.x,
      top: l.y,
      ...(meta.width !== l.w || meta.height !== l.h
        ? {}
        : {}),
    });
  }
  return sharp({
    create: {
      width: size.width,
      height: size.height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/* -------------------------------------------------------------------------- */
/* output                                                                      */
/* -------------------------------------------------------------------------- */

mkdirSync(OUT, { recursive: true });
const written = [];

async function save(name, buffer) {
  const path = join(OUT, name);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, buffer);
  written.push(path);
  console.log(`✓ ${name}`);
}

/** Recolour helper: returns a function that rewrites palette entries. */
const swap = (from, to) => (i, p) =>
  dist(p, from) < 60 ? to : p;


async function main() {
  /* ---- the mark, in the four colourways it ships in ---- */
  const markPalette = learnPalette(REGIONS.mark);
  console.log(
    "mark palette:",
    markPalette.map((p) => `#${p.rgb.map((v) => v.toString(16).padStart(2, "0")).join("")}`).join("  ")
  );

  const mark = trim(extract(REGIONS.mark));
  await save("legionone-mark.png", await toPng(mark));

  const markWhite = trim(extract(REGIONS.mark, { remap: swap(INK, WHITE) }));
  await save("legionone-mark-white.png", await toPng(markWhite));

  const markMonoBlack = trim(extract(REGIONS.mark, { remap: () => INK }));
  await save("legionone-mark-mono-black.png", await toPng(markMonoBlack));

  const markMonoWhite = trim(extract(REGIONS.mark, { remap: () => WHITE }));
  await save("legionone-mark-mono-white.png", await toPng(markMonoWhite));

  /* ---- wordmark ---- */
  const wordmark = trim(extract(REGIONS.wordmark));
  await save("legionone-wordmark.png", await toPng(wordmark));
  await save(
    "legionone-wordmark-white.png",
    await toPng(trim(extract(REGIONS.wordmark, { remap: swap(INK, WHITE) })))
  );

  /* ---- tagline ---- */
  const tagline = trim(extract(REGIONS.tagline));
  await save("legionone-tagline.png", await toPng(tagline));
  await save(
    "legionone-tagline-white.png",
    await toPng(trim(extract(REGIONS.tagline, { remap: swap(GREY, WHITE) })))
  );

  /* ---- horizontal lockup: mark + wordmark (+ tagline) ---- */
  const hMark = await piece(REGIONS.markLockup);
  const hWord = await piece(REGIONS.wordmarkLockup);
  const hTag = await piece(REGIONS.taglineLockup);

  const hBox = LOCKUP_H.canvas;
  const hSize = {
    width: hBox.right - hBox.left + 1,
    height: hBox.bottom - hBox.top + 1,
  };
  const hMarkX = LOCKUP_H.mark.left - hBox.left;
  const hMarkY = LOCKUP_H.mark.top - hBox.top;
  const hWordX = LOCKUP_H.wordmark.left - hBox.left;
  const hWordY = LOCKUP_H.wordmark.top - hBox.top;
  const hTagX = LOCKUP_H.tagline.left - hBox.left;
  const hTagY = LOCKUP_H.tagline.top - hBox.top;

  await save(
    "legionone-lockup-horizontal.png",
    await compose(hSize, [
      { src: hMark, x: hMarkX, y: hMarkY },
      { src: hWord, x: hWordX, y: hWordY },
    ])
  );
  await save(
    "legionone-lockup-horizontal-tagline.png",
    await compose(hSize, [
      { src: hMark, x: hMarkX, y: hMarkY },
      { src: hWord, x: hWordX, y: hWordY },
      { src: hTag, x: hTagX, y: hTagY },
    ])
  );
  await save(
    "legionone-lockup-horizontal-white.png",
    await compose(hSize, [
      { src: await piece(REGIONS.markLockup, { remap: swap(INK, WHITE) }), x: hMarkX, y: hMarkY },
      { src: await piece(REGIONS.wordmarkLockup, { remap: swap(INK, WHITE) }), x: hWordX, y: hWordY },
    ])
  );

  /* ---- stacked lockup: mark above wordmark (+ tagline) ---- */
  const vBox = LOCKUP_V.canvas;
  const vSize = {
    width: vBox.right - vBox.left + 1,
    height: vBox.bottom - vBox.top + 1,
  };
  const vMarkX = LOCKUP_V.mark.left - vBox.left;
  const vMarkY = LOCKUP_V.mark.top - vBox.top;
  const vWordX = LOCKUP_V.wordmark.left - vBox.left;
  const vWordY = LOCKUP_V.wordmark.top - vBox.top;
  const vTagX = LOCKUP_V.tagline.left - vBox.left;
  const vTagY = LOCKUP_V.tagline.top - vBox.top;

  await save(
    "legionone-lockup-stacked.png",
    await compose(vSize, [
      { src: await piece(REGIONS.mark), x: vMarkX, y: vMarkY },
      { src: await piece(REGIONS.wordmarkMid), x: vWordX, y: vWordY },
    ])
  );
  await save(
    "legionone-lockup-stacked-tagline.png",
    await compose(vSize, [
      { src: await piece(REGIONS.mark), x: vMarkX, y: vMarkY },
      { src: await piece(REGIONS.wordmarkMid), x: vWordX, y: vWordY },
      { src: await piece(REGIONS.tagline), x: vTagX, y: vTagY },
    ])
  );
  await save(
    "legionone-lockup-stacked-white.png",
    await compose(vSize, [
      { src: await piece(REGIONS.mark, { remap: swap(INK, WHITE) }), x: vMarkX, y: vMarkY },
      { src: await piece(REGIONS.wordmarkMid, { remap: swap(INK, WHITE) }), x: vWordX, y: vWordY },
    ])
  );

  /* ---- alternate-colour builds ---- */
  const variants = {
    "legionone-mark-variant-blue-cyan.png": REGIONS.variantBlueCyan,
    "legionone-mark-variant-gold.png": REGIONS.variantGold,
    "legionone-mark-variant-green.png": REGIONS.variantGreen,
    "legionone-mark-variant-red.png": REGIONS.variantRed,
  };
  for (const [name, box] of Object.entries(variants)) {
    await save(name, await toPng(trim(extract(box))));
  }

  /* ---- app icons, built on the rebuilt vector mark ---- */
  const markSvg = readFileSync(join(OUT, "legionone-mark.svg"), "utf8");
  const cube = markSvg
    .replace(/^[\s\S]*?<g id="legion-cube"[^>]*>/, "")
    .replace(/<\/g>\s*<\/svg>\s*$/, "");
  const cubeWhite = cube.replace(/#1d1d1f/g, "#ffffff");

  const iconSvg = (size, { rounded, light }) => {
    const inner = light ? cubeWhite : cube;
    const scale = (size / 512) * 0.74;
    const offset = (size - 512 * scale) / 2;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${rounded ? Math.round(size * 0.22) : 0}" fill="#1d1d1f"/>
  <g transform="translate(${offset.toFixed(2)} ${offset.toFixed(2)}) scale(${scale.toFixed(4)})">${inner}</g>
</svg>
`;
  };

  const iconRoot = join(OUT, "..");
  const iconTargets = [
    { file: "icon.svg", size: 512, rounded: true, light: true },
    { file: "icon-512.png", size: 512, rounded: true, light: true },
    { file: "icon-192.png", size: 192, rounded: true, light: true },
    { file: "apple-touch-icon.png", size: 180, rounded: false, light: true },
    { file: "favicon-32x32.png", size: 32, rounded: false, light: true },
    { file: "favicon-16x16.png", size: 16, rounded: false, light: true },
  ];
  const icoSizes = [16, 32, 48];
  const icoImages = [];

  for (const t of iconTargets) {
    const svg = iconSvg(t.size, t);
    if (t.file.endsWith(".svg")) {
      const path = join(iconRoot, t.file);
      writeFileSync(path, svg);
      written.push(path);
      console.log(`✓ ${t.file}`);
    } else {
      const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
      const path = join(iconRoot, t.file);
      writeFileSync(path, png);
      written.push(path);
      console.log(`✓ ${t.file}`);
    }
  }

  for (const size of icoSizes) {
    const svg = iconSvg(size, { rounded: false, light: true });
    const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
    icoImages.push({ size, data: png });
  }
  const icoPath = join(iconRoot, "favicon.ico");
  writeFileSync(icoPath, buildIco(icoImages));
  written.push(icoPath);
  console.log("✓ favicon.ico");

  console.log(`\n${written.length} files -> ${OUT}`);
}

/** Minimal .ico writer that embeds PNG payloads (supported since Vista). */
function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + dir.length;
  images.forEach((img, i) => {
    const e = 16 * i;
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, e + 0);
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, e + 1);
    dir.writeUInt8(0, e + 2);
    dir.writeUInt8(0, e + 3);
    dir.writeUInt16LE(1, e + 4);
    dir.writeUInt16LE(32, e + 6);
    dir.writeUInt32LE(img.data.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += img.data.length;
  });

  return Buffer.concat([header, dir, ...images.map((i) => i.data)]);
}

await main();
