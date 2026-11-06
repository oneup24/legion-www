#!/usr/bin/env node
/**
 * Post-build: flatten static export so the default locale (English) lives at
 * the project root, with /zh-HK/ kept for the Hong Kong Chinese version.
 * Required because next-intl's `localePrefix: "as-needed"` URL rewriting
 * relies on middleware, which is not available in static export mode.
 *
 * Without this, GitHub Pages would serve the home at
 *   oneup24.github.io/legion-www/en/
 * instead of
 *   oneup24.github.io/legion-www/
 *
 * It also promotes the locale-aware /404 route to out/404.html, because
 * GitHub Pages serves that file for any unknown URL and Next.js' built-in
 * static 404 would otherwise be an unstyled page outside the site layout.
 */

import { cp, rm, readdir, stat, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const DEFAULT_LOCALE = "en";

/**
 * Copy src into dest, merging directories instead of nesting them.
 * Node's fs.cp already merges, but being explicit keeps the behaviour
 * obvious when a destination directory already exists.
 */
async function copyInto(src, dest) {
  const srcStat = await stat(src);
  if (!srcStat.isDirectory()) {
    await cp(src, dest, { force: true });
    return;
  }
  await mkdir(dest, { recursive: true });
  for (const child of await readdir(src)) {
    await copyInto(join(src, child), join(dest, child));
  }
}

/**
 * GitHub Pages looks for 404.html next to the requested path, so the
 * prerendered /404 route has to exist as a file as well as a directory.
 */
async function promote404() {
  const targets = [
    { dir: OUT, label: "root" },
    { dir: join(OUT, "zh-HK"), label: "zh-HK" },
  ];

  for (const { dir, label } of targets) {
    const src = join(dir, "404", "index.html");
    if (!existsSync(src)) continue;
    await cp(src, join(dir, "404.html"), { force: true });
    console.log(`[postbuild] promoted ${label}/404/index.html → ${label}/404.html`);
  }
}

async function main() {
  if (!existsSync(OUT)) {
    console.error(`[postbuild] ${OUT}/ not found — run build first`);
    process.exit(1);
  }

  const defaultDir = join(OUT, DEFAULT_LOCALE);
  if (!existsSync(defaultDir)) {
    console.log(`[postbuild] no ${DEFAULT_LOCALE}/ directory — skipping flatten`);
    await promote404();
    return;
  }

  // Move all contents of out/en/* to out/* (preserving _next, og, brand, etc.)
  const entries = await readdir(defaultDir);
  for (const entry of entries) {
    await copyInto(join(defaultDir, entry), join(OUT, entry));
  }

  // Remove the now-redundant default locale directory
  await rm(defaultDir, { recursive: true, force: true });
  console.log(`[postbuild] flattened ${DEFAULT_LOCALE}/ → /`);

  await promote404();
}

main().catch((e) => {
  console.error("[postbuild] failed:", e);
  process.exit(1);
});
