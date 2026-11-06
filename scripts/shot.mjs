/**
 * Capture a screenshot at an emulated mobile viewport.
 *
 * Usage: node scripts/shot.mjs <url> <out.png> [width] [height]
 */
const url = process.argv[2];
const out = process.argv[3];
const width = Number(process.argv[4] || 390);
const height = Number(process.argv[5] || 844);
const scroll = Number(process.argv[6] || 0);
const full = process.argv[7] === "full";
const port = 9222;

const res = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, {
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
  deviceScaleFactor: 2,
  mobile: true,
});
await send("Page.enable");
await send("Page.navigate", { url });
await new Promise((r) => setTimeout(r, 3500));

// Force every whileInView block into view so the full page is rendered.
await send("Runtime.evaluate", {
  expression: `(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 220));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 700));
  })()`,
  awaitPromise: true,
});

const metrics = await send("Page.getLayoutMetrics");
const contentHeight = Math.ceil(metrics.result.contentSize.height);

if (full) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height: Math.min(contentHeight, 12000),
    deviceScaleFactor: 2,
    mobile: true,
  });
} else {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 2,
    mobile: true,
  });
}
await send("Runtime.evaluate", {
  expression: `window.scrollTo(0, ${scroll}); new Promise(r => setTimeout(r, 600))`,
  awaitPromise: true,
});
await new Promise((r) => setTimeout(r, 700));

const shot = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: full,
});
const { writeFileSync } = await import("node:fs");
writeFileSync(out, Buffer.from(shot.result.data, "base64"));
console.log(`saved ${out} (${width} x ${full ? contentHeight : height})`);
ws.close();
process.exit(0);
