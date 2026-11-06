/**
 * Contact sheet for the mobile mock-ups.
 *
 * The full-page mobile captures are 15000-17000px tall, which is unusable in
 * a single sheet. Each page is cut to its first screenful-plus so the sheet
 * compares the same thing across pages: what a visitor sees on arrival.
 *
 * Usage: node scripts/make-mobile-sheet.mjs <srcDir> <out.png> [cropHeight]
 */
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { basename, join, dirname } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(
  "/Users/user/Legionone/node_modules/.pnpm/sharp@0.35.4_@types+node@22.20.4/node_modules/sharp"
);

const [srcDir, out, cropArg] = process.argv.slice(2);
const CROP = Number(cropArg || 2600);

const files = readdirSync(srcDir)
  .filter((f) => f.toLowerCase().endsWith(".png") && !f.startsWith("_"))
  .sort();

const GAP = 18;
const PAD = 26;
const LABEL_H = 26;
const TITLE_H = 66;
const CELL = 390;

const shots = await Promise.all(
  files.map(async (f) => {
    const meta = await sharp(join(srcDir, f)).metadata();
    const h = Math.min(CROP, meta.height ?? CROP);
    const buf = await sharp(join(srcDir, f))
      .extract({ left: 0, top: 0, width: meta.width ?? 780, height: h })
      .resize({ width: CELL })
      .toBuffer();
    const m = await sharp(buf).metadata();
    return { name: f.replace(/\.png$/i, ""), buf, h: m.height ?? 0 };
  }),
);

const cellH = Math.max(...shots.map((s) => s.h));
const sheetW = PAD * 2 + shots.length * CELL + (shots.length - 1) * GAP;
const sheetH = PAD * 2 + TITLE_H + cellH + LABEL_H;

const composites = [];
const labels = [];

shots.forEach((s, i) => {
  const x = PAD + i * (CELL + GAP);
  const y = PAD + TITLE_H;
  composites.push({ input: s.buf, left: x, top: y });
  labels.push(
    `<text x="${x}" y="${y + s.h + 18}" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="14" fill="#8a8a8f" letter-spacing="1.5">${s.name.toUpperCase()}</text>`,
  );
});

labels.push(
  `<text x="${PAD}" y="${PAD + 34}" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="#ffffff" letter-spacing="2">MOBILE · 390PX · LEGIONONE</text>`,
);

const svg = Buffer.from(
  `<svg width="${sheetW}" height="${sheetH}" xmlns="http://www.w3.org/2000/svg">${labels.join("")}</svg>`,
);

mkdirSync(dirname(out), { recursive: true });
await sharp({
  create: {
    width: sheetW,
    height: sheetH,
    channels: 3,
    background: { r: 8, g: 8, b: 10 },
  },
})
  .composite([...composites, { input: svg, left: 0, top: 0 }])
  .png()
  .toFile(out);

console.log(`saved ${out}  (${shots.length} pages, ${sheetW}x${sheetH})`);
