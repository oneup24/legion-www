/**
 * Capture a page as a sequence of viewport screenshots.
 *
 * A full-page capture is useless here: elements that animate in with
 * `whileInView` are blank unless the viewport has actually scrolled past
 * them. This scrolls the page in steps and shoots each step, which is also
 * how a reader experiences the page.
 *
 * Usage: node scripts/shoot-sections.mjs <url> <outDir> [width] [height] [step]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const url = process.argv[2];
const outDir = process.argv[3];
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 900);
const step = Number(process.argv[6] || 820);
const port = 9222;

mkdirSync(outDir, { recursive: true });

const res = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
  method: "PUT",
});
const target = await res.json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const mid = ++id;
    pending.set(mid, resolve);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });

await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.enable");
await send("Page.navigate", { url });
await new Promise((r) => setTimeout(r, 2600));

const measured = await send("Runtime.evaluate", {
  expression: "document.documentElement.scrollHeight",
  returnByValue: true,
});
const total = measured.result?.result?.value ?? 0;
const frames = Math.min(Math.ceil(total / step), 40);

for (let i = 0; i < frames; i++) {
  const y = i * step;
  await send("Runtime.evaluate", {
    expression: `window.scrollTo(0, ${y}); void 0;`,
  });
  // let scroll-linked animations settle
  await new Promise((r) => setTimeout(r, 700));
  const shot = await send("Page.captureScreenshot", { format: "png" });
  const name = `${String(i + 1).padStart(2, "0")}.png`;
  writeFileSync(join(outDir, name), Buffer.from(shot.result.data, "base64"));
  console.log(`✓ ${name}  y=${y}`);
}

console.log(`\n${frames} frames, page height ${total}px`);
process.exit(0);
