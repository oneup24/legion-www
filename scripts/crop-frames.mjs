/**
 * Crop key frames out of a full-page screenshot for delivery.
 * Usage: node scripts/crop-frames.mjs <full.png> <outDir>
 */
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(
  "/Users/user/Legionone/node_modules/.pnpm/sharp@0.35.4_@types+node@22.20.4/node_modules/sharp"
);

const [full, outDir] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });

const img = sharp(full);
const { width, height } = await img.metadata();
console.log(`source ${width} x ${height}`);

// Section anchors in CSS pixels (measured with scripts/section-tops.mjs).
const frames = [
  ["01-首頁-Hero-藍場", 0, 780],
  ["02-首頁-我們相信-墨場", 1150, 540],
  ["03-首頁-一段之字脊椎", 1680, 960],
  ["04-首頁-六大痛點矩陣", 3180, 1150],
  ["05-首頁-四大核心能力", 5250, 700],
  ["06-首頁-產品預覽-藍場", 5960, 1000],
  ["07-首頁-行業副線-墨場", 6990, 900],
  ["08-首頁-數據入六角形", 8660, 520],
  ["09-首頁-全幅品牌時刻", 10190, 720],
  ["10-首頁-Footer-L.E.G.I.O.N.", 10930, 690],
];

const scale = width / 1440;

for (const [name, topCss, hCss] of frames) {
  const top = Math.round(topCss * scale);
  const h = Math.round(hCss * scale);
  const buf = await sharp(full)
    .extract({
      left: 0,
      top,
      width,
      height: Math.min(h, height - top),
    })
    .png()
    .toBuffer();
  const out = join(outDir, `${name}.png`);
  writeFileSync(out, buf);
  console.log(`${out}  (${width} x ${Math.min(h, height - top)})`);
}
