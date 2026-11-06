/**
 * Check the two message files against each other.
 *
 * The English and Hong Kong Chinese versions have to stay structurally
 * identical — every key present in one must exist in the other, with the
 * same type — otherwise one language silently falls back or renders a
 * missing-message error at runtime.
 *
 * Usage: node scripts/check-i18n.mjs
 */
import { readFileSync } from "node:fs";

const LOCALES = ["en", "zh-HK"];

const load = (loc) =>
  JSON.parse(readFileSync(`messages/${loc}.json`, "utf8"));

/** Flatten a nested object into dotted key paths. */
function flatten(obj, prefix = "") {
  const out = new Map();
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      for (const [p, pv] of flatten(v, path)) out.set(p, pv);
    } else {
      out.set(path, Array.isArray(v) ? "array" : typeof v);
    }
  }
  return out;
}

const maps = Object.fromEntries(
  LOCALES.map((loc) => [loc, flatten(load(loc))]),
);

let problems = 0;

for (let i = 0; i < LOCALES.length; i++) {
  for (let j = i + 1; j < LOCALES.length; j++) {
    const a = LOCALES[i];
    const b = LOCALES[j];
    for (const [key, type] of maps[a]) {
      if (!maps[b].has(key)) {
        console.log(`✗ ${key} — missing in ${b}`);
        problems++;
      } else if (maps[b].get(key) !== type) {
        console.log(
          `✗ ${key} — ${type} in ${a} but ${maps[b].get(key)} in ${b}`,
        );
        problems++;
      }
    }
    for (const key of maps[b].keys()) {
      if (!maps[a].has(key)) {
        console.log(`✗ ${key} — missing in ${a}`);
        problems++;
      }
    }
  }
}

const count = maps[LOCALES[0]].size;
if (problems === 0) {
  console.log(`✓ ${count} keys, ${LOCALES.join(" / ")} structurally identical`);
} else {
  console.log(`\n${problems} problem(s) across ${count} keys`);
  process.exitCode = 1;
}
