/**
 * Build the OG contact sheet and the icon-set preview used for delivery.
 * Usage: node scripts/make-previews.mjs <outDir>
 */
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(
  "/Users/user/Legionone/node_modules/.pnpm/sharp@0.35.4_@types+node@22.20.4/node_modules/sharp"
);

const outDir = process.argv[2];
mkdirSync(outDir, { recursive: true });

const OG = ["default", "product", "pricing", "use-cases", "security"];
const LABEL = {
  default: "default",
  product: "product",
  pricing: "pricing",
  "use-cases": "use-cases",
  security: "security",
};

const COLS = 2;
const GAP = 40;
const PAD = 40;
const LABEL_H = 64;

const tiles = [];
for (const key of OG) {
  const buf = await sharp(`public/og/${key}.png`).resize(760).toBuffer();
  const m = await sharp(buf).metadata();
  tiles.push({ key, buf, w: m.width, h: m.height });
}
const tw = tiles[0].w;
const th = tiles[0].h;
const rows = Math.ceil(tiles.length / COLS);

const sheetW = PAD * 2 + COLS * tw + (COLS - 1) * GAP;
const sheetH = PAD * 2 + rows * (th + LABEL_H) + (rows - 1) * GAP;

const composites = tiles.map((t, i) => {
  const cx = PAD + (i % COLS) * (tw + GAP);
  const cy = PAD + Math.floor(i / COLS) * (th + LABEL_H + GAP);
  return { input: t.buf, left: cx, top: cy };
});

const labelSvgs = tiles.map((t, i) => {
  const cx = PAD + (i % COLS) * (tw + GAP);
  const cy = PAD + Math.floor(i / COLS) * (th + LABEL_H + GAP) + th + 16;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="34">
    <text x="0" y="24" font-family="Helvetica,Arial" font-size="24" fill="#333333">og/${t.key}.png</text>
  </svg>`;
  return { input: Buffer.from(svg), left: cx, top: cy };
});

const ogSheet = await sharp({
  create: {
    width: sheetW,
    height: sheetH,
    channels: 4,
    background: "#f5f5f7",
  },
})
  .composite([...composites, ...labelSvgs])
  .png()
  .toBuffer();
writeFileSync(join(outDir, "LegionOne-v2.0-OG分享圖.png"), ogSheet);
console.log(`OG sheet → ${join(outDir, "LegionOne-v2.0-OG分享圖.png")} (${sheetW}x${sheetH})`);

// Icon set preview — every generated asset on a light sheet.
const ICONS = [
  ["public/icon.svg", 512, "icon.svg"],
  ["public/icon-512.png", 512, "icon-512.png"],
  ["public/icon-192.png", 192, "icon-192.png"],
  ["public/apple-touch-icon.png", 180, "apple-touch-icon.png"],
  ["public/favicon-32x32.png", 32, "favicon.ico (32)"],
  ["public/favicon-16x16.png", 16, "favicon.ico (16)"],
];

const CELL = 200;
const COLS2 = 4;
const rows2 = Math.ceil(ICONS.length / COLS2);
const sheet2W = PAD * 2 + COLS2 * CELL + (COLS2 - 1) * GAP;
const sheet2H = PAD * 2 + rows2 * (CELL + LABEL_H) + (rows2 - 1) * GAP;

const comp2 = [];
const lab2 = [];
const DISPLAY = 150;
for (let i = 0; i < ICONS.length; i++) {
  const [path, native, label] = ICONS[i];
  // Tiny favicons are shown nearest-neighbour so the preview shows the real
  // pixel grid instead of a blurry upscale.
  const kernel = native <= 32 ? "nearest" : "lanczos3";
  const buf = await sharp(path, { density: 384 })
    .resize(DISPLAY, DISPLAY, {
      fit: "contain",
      kernel,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  const cx = PAD + (i % COLS2) * (CELL + GAP);
  const cy = PAD + Math.floor(i / COLS2) * (CELL + LABEL_H + GAP);
  comp2.push({
    input: buf,
    left: cx + Math.round((CELL - DISPLAY) / 2),
    top: cy + Math.round((CELL - DISPLAY) / 2),
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="30">
    <text x="0" y="22" font-family="Helvetica,Arial" font-size="20" fill="#333333">${label}</text>
  </svg>`;
  lab2.push({ input: Buffer.from(svg), left: cx, top: cy + CELL + 10 });
}

const iconSheet = await sharp({
  create: { width: sheet2W, height: sheet2H, channels: 4, background: "#ffffff" },
})
  .composite([...comp2, ...lab2])
  .png()
  .toBuffer();
writeFileSync(join(outDir, "LegionOne-v2.0-Icon集.png"), iconSheet);
console.log(`Icon sheet → ${join(outDir, "LegionOne-v2.0-Icon集.png")} (${sheet2W}x${sheet2H})`);
