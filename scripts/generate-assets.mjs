#!/usr/bin/env node
/**
 * Open Graph card generator.
 *
 * The share cards are built from the same design system as the site: a black
 * canvas, white uppercase type, brand blue as the only accent, and the cube
 * mark taken from the vector trace of the brand sheet (so the card and the
 * site always show the same logo).
 *
 *   pnpm assets          # regenerate the cards
 *   pnpm assets:check    # verify the committed PNGs match the SVG sources
 *
 * The app icons are generated separately by scripts/split-logo.mjs, which
 * builds them from the same traced mark.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const OG_DIR = join(PUBLIC, "og");

/* -------------------------------------------------------------------------- */
/* sharp resolution                                                            */
/* -------------------------------------------------------------------------- */

async function loadSharp() {
  const { createRequire } = await import("node:module");
  const require = createRequire(import.meta.url);

  try {
    return require("sharp");
  } catch {
    /* fall through to the pnpm store */
  }

  const store = join(ROOT, "node_modules", ".pnpm");
  if (!existsSync(store)) {
    throw new Error("sharp not found. Run `pnpm install` first.");
  }
  const { readdir } = await import("node:fs/promises");
  const candidates = (await readdir(store))
    .filter((d) => d.startsWith("sharp@"))
    .sort()
    .reverse();
  for (const dir of candidates) {
    const p = join(store, dir, "node_modules", "sharp");
    if (existsSync(p)) {
      return require(p);
    }
  }
  throw new Error("sharp not found in node_modules/.pnpm. Run `pnpm install`.");
}

/* -------------------------------------------------------------------------- */
/* brand                                                                       */
/* -------------------------------------------------------------------------- */

const INK = "#1d1d1f";
const BLUE = "#0166e6";
const GREY = "#87868b";

const FONT =
  "Poppins, Helvetica Neue, Helvetica, Arial, PingFang HK, Noto Sans CJK SC, sans-serif";

/**
 * The cube mark, read from the vector trace so the share card and the site
 * are guaranteed to show the same logo.
 */
async function cubePaths() {
  const svg = await readFile(join(PUBLIC, "brand", "legionone-mark.svg"), "utf8");
  const inner = svg
    .replace(/^[\s\S]*?<g id="legion-cube"[^>]*>/, "")
    .replace(/<\/g>\s*<\/svg>\s*$/, "");
  return inner.replace(/#1d1d1f/g, "#ffffff").replace(/#0166e6/g, BLUE);
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Rough advance width per character — enough to size the card's list. */
function textWidth(text, size) {
  let w = 0;
  for (const ch of text) {
    if (/[　-鿿＀-￯]/.test(ch)) w += size;
    else if (ch === " ") w += size * 0.28;
    else if (/[iIl.,:;'"|!\[\]]/.test(ch)) w += size * 0.3;
    else if (/[A-Z0-9@%&]/.test(ch)) w += size * 0.62;
    else w += size * 0.54;
  }
  return w;
}

/* -------------------------------------------------------------------------- */
/* Open Graph cards                                                            */
/* -------------------------------------------------------------------------- */

const OG_VARIANTS = [
  {
    slug: "default",
    kicker: "LEGIONONE · BUSINESS OPERATING SYSTEM",
    headline: ["ONE SYSTEM.", "EVERY TEAM.", "THE SAME NUMBERS."],
    sub: "The ERP + CRM platform built for Hong Kong SMEs.",
    cta: "BOOK A FREE DEMO",
    items: ["Revenue", "Finance", "Customers", "Inventory", "Quotation", "Invoice"],
  },
  {
    slug: "product",
    kicker: "PRODUCT",
    headline: ["SEVEN MODULES.", "ONE PLATFORM."],
    sub: "Dashboard, finance, CRM, inventory, sales, HR and automation.",
    cta: "BOOK A FREE DEMO",
    items: ["Dashboard", "Finance", "CRM", "Inventory", "Sales", "Automation"],
  },
  {
    slug: "pricing",
    kicker: "PRICING",
    headline: ["PRICING THAT", "GROWS WITH YOU."],
    sub: "Three plans, from a one-person company to a 200-person team.",
    cta: "BOOK A FREE DEMO",
    items: ["Starter · 1–5 users", "Growth · 5–25 users", "Enterprise · 50+ users"],
  },
  {
    slug: "use-cases",
    kicker: "INDUSTRIES",
    headline: ["ONE SYSTEM.", "TWO INDUSTRIES."],
    sub: "Trading and professional services, taken from the workflow up.",
    cta: "BOOK A FREE DEMO",
    items: [
      "Import & export trading",
      "Supply chain & inventory",
      "Accounting & legal",
      "Projects, time & invoices",
    ],
  },
  {
    slug: "security",
    kicker: "SECURITY",
    headline: ["ENTERPRISE-GRADE", "SECURITY."],
    sub: "Built into the architecture. Your data stays in Hong Kong.",
    cta: "BOOK A FREE DEMO",
    items: [
      "ISO 27001",
      "GDPR Ready",
      "AWS Hong Kong",
      "Cyber Trust Mark",
    ],
  },
];

function renderOgSvg(v, cube) {
  const listTop = 214;
  const rowH = 62;
  const rows = v.items
    .map((item, i) => {
      const y = listTop + i * rowH;
      return `<g>
        <text x="790" y="${y}" fill="#3d9bff" font-family="${FONT}" font-size="17" font-weight="500" letter-spacing="0.04em">${String(i + 1).padStart(2, "0")}</text>
        <text x="836" y="${y}" fill="#ffffff" font-family="${FONT}" font-size="25" font-weight="400">${esc(item)}</text>
        <line x1="790" y1="${y + 26}" x2="1120" y2="${y + 26}" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1"/>
      </g>`;
    })
    .join("\n    ");

  // Headlines shrink to fit the left column rather than running into the list.
  const HEAD_MAX = 620;
  const headline = v.headline
    .map((line, i) => {
      const size = 58;
      const w = textWidth(line, size);
      const fitted = w > HEAD_MAX ? size * (HEAD_MAX / w) : size;
      return `<text x="80" y="${236 + i * 70}" fill="#ffffff" font-family="${FONT}" font-size="${fitted.toFixed(1)}" font-weight="500" letter-spacing="-0.02em">${esc(line)}</text>`;
    })
    .join("\n    ");

  // The CTA is letter-spaced, so the tracking has to be part of its width.
  const ctaSize = 20;
  const ctaTrack = ctaSize * 0.12;
  const ctaW = Math.round(
    textWidth(v.cta, ctaSize) + v.cta.length * ctaTrack + 56,
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="hex" width="72" height="83.1" patternUnits="userSpaceOnUse">
      <polygon points="36,0 72,20.8 72,62.4 36,83.1 0,62.4 0,20.8" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${BLUE}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${BLUE}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${INK}"/>
  <rect width="1200" height="630" fill="url(#hex)"/>
  <rect x="0" y="0" width="1200" height="6" fill="url(#edge)"/>

  <g transform="translate(80 66) scale(0.085)">${cube}</g>
  <text x="132" y="108" fill="#ffffff" font-family="${FONT}" font-size="34" font-weight="500" letter-spacing="-0.035em">LegionOne</text>
  <rect x="132" y="120" width="44" height="3" fill="${BLUE}"/>
  <text x="80" y="176" fill="#3d9bff" font-family="${FONT}" font-size="17" font-weight="500" letter-spacing="0.22em">${esc(v.kicker)}</text>

  ${headline}
  <text x="80" y="466" fill="${GREY}" font-family="${FONT}" font-size="24" font-weight="400">${esc(v.sub)}</text>

  <rect x="80" y="500" width="${ctaW}" height="54" fill="${BLUE}"/>
  <text x="${80 + ctaW / 2}" y="534" fill="#ffffff" font-family="${FONT}" font-size="${ctaSize}" font-weight="500" letter-spacing="0.12em" text-anchor="middle">${esc(v.cta)}</text>

  <line x1="760" y1="176" x2="760" y2="554" stroke="#ffffff" stroke-opacity="0.14" stroke-width="1"/>
  ${rows}

  <text x="1120" y="596" fill="#ffffff" fill-opacity="0.42" font-family="${FONT}" font-size="17" letter-spacing="0.1em" text-anchor="end">legionone.hk</text>
</svg>`;
}

/* -------------------------------------------------------------------------- */
/* main                                                                        */
/* -------------------------------------------------------------------------- */

async function main() {
  const sharp = await loadSharp();
  const check = process.argv.includes("--check");
  const written = [];
  const cube = await cubePaths();

  await mkdir(OG_DIR, { recursive: true });

  for (const v of OG_VARIANTS) {
    const svg = renderOgSvg(v, cube);
    const svgPath = join(OG_DIR, `${v.slug}.svg`);
    const pngPath = join(OG_DIR, `${v.slug}.png`);
    const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

    if (check) {
      const existing = existsSync(pngPath) ? await readFile(pngPath) : null;
      const same = existing && existing.equals(png);
      console.log(`${same ? "✓" : "✗"} og/${v.slug}.png`);
      if (!same) process.exitCode = 1;
    } else {
      await writeFile(svgPath, svg, "utf8");
      await writeFile(pngPath, png);
      written.push(svgPath, pngPath);
      console.log(`✓ og/${v.slug}.svg + og/${v.slug}.png`);
    }
  }

  if (!check) {
    console.log(`\n${written.length / 2} share cards written`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
