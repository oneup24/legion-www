#!/usr/bin/env node
/**
 * Post-build: flatten static export so the default locale (zh-HK) lives at
 * the project root, with /en/ remaining for English. Required because
 * next-intl's `localePrefix: "as-needed"` URL rewriting relies on middleware,
 * which is not available in static export mode.
 *
 * Without this, GitHub Pages would serve the home at
 *   oneup24.github.io/legion-www/zh-HK/
 * instead of
 *   oneup24.github.io/legion-www/
 */

import { cp, rm, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const DEFAULT_LOCALE = "zh-HK";

async function main() {
  if (!existsSync(OUT)) {
    console.error(`[postbuild] ${OUT}/ not found — run build first`);
    process.exit(1);
  }

  const defaultDir = join(OUT, DEFAULT_LOCALE);
  if (!existsSync(defaultDir)) {
    console.log(`[postbuild] no ${DEFAULT_LOCALE}/ directory — skipping flatten`);
    return;
  }

  // Move all contents of out/zh-HK/* to out/* (preserving _next, og, etc.)
  const entries = await readdir(defaultDir);
  for (const entry of entries) {
    const src = join(defaultDir, entry);
    const dest = join(OUT, entry);
    const srcStat = await stat(src);
    if (srcStat.isDirectory()) {
      await cp(src, dest, { recursive: true, force: true });
    } else {
      await cp(src, dest, { force: true });
    }
  }

  // Remove the now-redundant default locale directory
  await rm(defaultDir, { recursive: true, force: true });
  console.log(`[postbuild] flattened ${DEFAULT_LOCALE}/ → /`);
}

main().catch((e) => {
  console.error("[postbuild] failed:", e);
  process.exit(1);
});