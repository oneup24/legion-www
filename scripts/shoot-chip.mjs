/**
 * Click a tab in the Product Preview tab row, then a chip in the row below,
 * and capture the section — to prove the tab → chips → cards wiring works.
 *
 * Usage: node scripts/shoot-chip.mjs <url> <out.png> [tabIndex] [chipIndex]
 */
import { writeFileSync } from "node:fs";

const url = process.argv[2];
const out = process.argv[3];
const tabIndex = Number(process.argv[4] || 0);
const chipIndex = Number(process.argv[5] || 1);
const port = 9222;

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
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.enable");
await send("Page.navigate", { url });
await new Promise((r) => setTimeout(r, 2800));

/** Click the nth tab of the Product Preview tab row. */
const tab = await send("Runtime.evaluate", {
  expression: `
    (function () {
      var lists = document.querySelectorAll('[role="tablist"]');
      for (var li = 0; li < lists.length; li++) {
        var tabs = lists[li].querySelectorAll('[role="tab"]');
        var names = Array.prototype.slice.call(tabs).map(function (b) {
          return b.textContent.trim();
        });
        if (names.indexOf('CRM') !== -1 || names.indexOf('Finance') !== -1) {
          if (tabs[${tabIndex}]) {
            tabs[${tabIndex}].click();
            tabs[${tabIndex}].scrollIntoView({ block: 'center' });
            return names[${tabIndex}];
          }
        }
      }
      return 'no tab';
    })();
  `,
  returnByValue: true,
});
console.log("tab:", tab.result?.result?.value);

await new Promise((r) => setTimeout(r, 900));

/** Click the nth chip of the row below. */
const chip = await send("Runtime.evaluate", {
  expression: `
    (function () {
      var btns = document.querySelectorAll('button[aria-pressed]');
      if (!btns.length) return 'no chips';
      var target = btns[${chipIndex}] || btns[0];
      target.click();
      return target.textContent.trim();
    })();
  `,
  returnByValue: true,
});
console.log("chip:", chip.result?.result?.value);

await new Promise((r) => setTimeout(r, 900));

const shot = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(out, Buffer.from(shot.result.data, "base64"));
console.log("saved", out);
process.exit(0);
