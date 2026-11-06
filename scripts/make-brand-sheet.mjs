/**
 * Build labelled contact sheets for the split brand assets, so the delivery
 * can be reviewed at a glance on both a light and a dark ground.
 *
 * Usage: node scripts/make-brand-sheet.mjs <brandDir> <outDir>
 */
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(
  "/Users/user/Legionone/node_modules/.pnpm/sharp@0.35.4_@types+node@22.20.4/node_modules/sharp"
);

const BRAND = process.argv[2] || "public/brand";
const OUT = process.argv[3] || "/Users/user/app-marketing";
mkdirSync(OUT, { recursive: true });

const FONT = `-apple-system, "Helvetica Neue", "PingFang HK", Helvetica, sans-serif`;

const ITEMS = [
  ["legionone-mark.png", "cube mark", "主圖標（機黑＋藍）"],
  ["legionone-mark.svg", "cube mark (vector)", "向量版，網站首選"],
  ["legionone-mark-white.png", "cube mark — white", "深色底用（白＋藍）"],
  ["legionone-mark-mono-black.png", "cube mark — mono black", "單色黑"],
  ["legionone-mark-mono-white.png", "cube mark — mono white", "單色白"],
  ["legionone-wordmark.png", "wordmark", "「LegionOne」字標"],
  ["legionone-wordmark-white.png", "wordmark — white", "深色底用字標"],
  ["legionone-tagline.png", "tagline", "PEOPLE. SYSTEM. PROGRESS"],
  ["legionone-tagline-white.png", "tagline — white", "深色底用 tagline"],
  ["legionone-lockup-horizontal.png", "lockup — horizontal", "橫向：圖標＋字標"],
  ["legionone-lockup-horizontal-tagline.png", "lockup — horizontal + tagline", "橫向連 tagline"],
  ["legionone-lockup-horizontal-white.png", "lockup — horizontal (white)", "深色底橫向"],
  ["legionone-lockup-stacked.png", "lockup — stacked", "直向：圖標在上"],
  ["legionone-lockup-stacked-tagline.png", "lockup — stacked + tagline", "直向連 tagline"],
  ["legionone-lockup-stacked-white.png", "lockup — stacked (white)", "深色底直向"],
  ["legionone-mark-variant-blue-cyan.png", "variant — blue / cyan", "原圖變體 1"],
  ["legionone-mark-variant-green.png", "variant — green", "原圖變體 2"],
  ["legionone-mark-variant-red.png", "variant — red", "原圖變體 3"],
  ["legionone-mark-variant-gold.png", "variant — gold", "原圖變體 4"],
];

const CELL_W = 470;
const CELL_H = 280;
const COLS = 3;

async function build(bg, fg, sub, file) {
  const rows = Math.ceil(ITEMS.length / COLS);
  const W = CELL_W * COLS;
  const H = CELL_H * rows;
  const comps = [];

  for (let i = 0; i < ITEMS.length; i++) {
    const [name, label, note] = ITEMS[i];
    const x = (i % COLS) * CELL_W;
    const y = Math.floor(i / COLS) * CELL_H;

    const art = await sharp(join(BRAND, name))
      .resize({
        width: CELL_W - 60,
        height: CELL_H - 110,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    const cap = `<svg xmlns="http://www.w3.org/2000/svg" width="${CELL_W - 40}" height="60">
  <text x="20" y="24" font-family='${FONT}' font-size="17" font-weight="600" fill="${fg}">${label}</text>
  <text x="20" y="48" font-family='${FONT}' font-size="14" fill="${sub}">${note}</text>
</svg>`;

    comps.push({ input: art, left: x + 30, top: y + 20 });
    comps.push({ input: Buffer.from(cap), left: x + 20, top: y + CELL_H - 78 });
  }

  const png = await sharp({
    create: { width: W, height: H, channels: 4, background: bg },
  })
    .composite(comps)
    .png()
    .toBuffer();

  writeFileSync(join(OUT, file), png);
  console.log(`✓ ${file}`);
}

await build("#ffffff", "#1d1d1f", "#87868b", "LegionOne-品牌資產-對照表-淺底.png");
await build("#0d0d0f", "#ffffff", "#9a9aa2", "LegionOne-品牌資產-對照表-深底.png");
