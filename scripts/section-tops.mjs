/**
 * Report the top offset of every <section> on a page so frames can be
 * cropped accurately instead of by guesswork.
 * Usage: node scripts/section-tops.mjs <url>
 */
const url = process.argv[2];
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
  width: 1440,
  height: 900,
  deviceScaleFactor: 2,
  mobile: false,
});
await send("Page.enable");
await send("Page.navigate", { url });
await new Promise((r) => setTimeout(r, 3500));
await send("Runtime.evaluate", {
  expression: `(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y); await new Promise(r => setTimeout(r, 200));
    }
    window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 600));
  })()`,
  awaitPromise: true,
});

const r = await send("Runtime.evaluate", {
  expression: `(() => {
    const out = [];
    document.querySelectorAll('section, footer').forEach((el) => {
      const b = el.getBoundingClientRect();
      out.push({
        top: Math.round(b.top + window.scrollY),
        h: Math.round(b.height),
        cls: (el.getAttribute('class') || '').slice(0, 70),
        head: (el.querySelector('h1,h2')?.textContent || '').slice(0, 26),
      });
    });
    return JSON.stringify({ total: document.body.scrollHeight, sections: out });
  })()`,
  returnByValue: true,
});
console.log(r.result.result.value);
ws.close();
process.exit(0);
