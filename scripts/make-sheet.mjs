/**
 * Build a contact sheet from a folder of PNGs.
 *
 * The mock-up screenshots are read as a sequence, not one at a time, so the
 * delivery folder carries both the individual frames and a single sheet that
 * shows the whole page at a glance.
 *
 * Usage: node scripts/make-sheet.mjs <srcDir> <out.png> [cols] [cellWidth] [title]
 */
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, join, dirname } from "node:path";

/** Collect PNGs from a directory tree, so a folder of page folders works too. */
function collect(dir, prefix = "") {
  const out = [];
  for (const entry of readdirSync(dir).sort()) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...collect(full, `${prefix}${entry}/`));
    } else if (entry.toLowerCase().endsWith(".png")) {
      out.push({
        rel: `${prefix}${entry}`,
        label: `${prefix}${entry.replace(/\.png$/i, "")}`,
      });
    }
  }
  return out;
}

const require = createRequire(import.meta.url);
const sharp = require(
  "/Users/user/Legionone/node_modules/.pnpm/sharp@0.35.4_@types+node@22.20.4/node_modules/sharp"
);

const [srcDir, out, colsArg, widthArg, title = ""] = process.argv.slice(2);
const COLS = Number(colsArg || 4);
const CELL = Number(widthArg || 460);

const entries = collect(srcDir);

if (!entries.length) {
  console.error(`no PNGs in ${srcDir}`);
  process.exit(1);
}

const GAP = 18;
const PAD = 26;
const LABEL_H = 26;
const TITLE_H = title ? 66 : 0;

const resized = await Promise.all(
  entries.map(async (e) => {
    const buf = await sharp(join(srcDir, e.rel))
      .resize({ width: CELL, withoutEnlargement: true })
      .toBuffer();
    const meta = await sharp(buf).metadata();
    return { name: e.label, buf, h: meta.height ?? 0 };
  }),
);

const cellH = Math.max(...resized.map((r) => r.h));
const rows = Math.ceil(resized.length / COLS);
const sheetW = PAD * 2 + COLS * CELL + (COLS - 1) * GAP;
const sheetH = PAD * 2 + TITLE_H + rows * (cellH + LABEL_H) + (rows - 1) * GAP;

const composites = [];
const labels = [];

resized.forEach((r, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = PAD + col * (CELL + GAP);
  const y = PAD + TITLE_H + row * (cellH + LABEL_H + GAP);

  composites.push({ input: r.buf, left: x, top: y });
  labels.push(
    `<text x="${x}" y="${y + r.h + 18}" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="14" fill="#8a8a8f" letter-spacing="1.5">${r.name
      .replace(/\.png$/i, "")
      .toUpperCase()}</text>`,
  );
});

if (title) {
  labels.push(
    `<text x="${PAD}" y="${PAD + 34}" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="#ffffff" letter-spacing="2">${title.toUpperCase()}</text>`,
  );
}

const svg = Buffer.from(
  `<svg width="${sheetW}" height="${sheetH}" xmlns="http://www.w3.org/2000/svg">${labels.join(
    "",
  )}</svg>`,
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

console.log(`saved ${out}  (${entries.length} frames, ${sheetW}x${sheetH})`);
