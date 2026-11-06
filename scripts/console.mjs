/**
 * Print the console output and page exceptions for a URL.
 *
 * Usage: node scripts/console.mjs <url> [waitMs]
 */
const url = process.argv[2];
const wait = Number(process.argv[3] || 3500);
const port = 9222;

const res = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
  method: "PUT",
});
const target = await res.json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
const logs = [];

ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
    return;
  }
  if (msg.method === "Runtime.consoleAPICalled") {
    const text = (msg.params.args || [])
      .map((a) => a.value ?? a.description ?? a.unserializableValue ?? "")
      .join(" ");
    logs.push(
      `[console.${msg.params.type}] ${text}`.slice(0, 1200),
    );
  }
  if (msg.method === "Runtime.exceptionThrown") {
    const d = msg.params.exceptionDetails;
    logs.push(
      `[exception] ${d.text} ${d.exception?.description ?? ""}`.slice(0, 1600),
    );
  }
  if (msg.method === "Log.entryAdded") {
    const e = msg.params.entry;
    logs.push(`[log.${e.level}] ${e.text} ${e.url ?? ""}`.slice(0, 800));
  }
};

const send = (method, params = {}) =>
  new Promise((resolve) => {
    const mid = ++id;
    pending.set(mid, resolve);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });

await send("Runtime.enable");
await send("Log.enable");
await send("Page.enable");
await send("Page.navigate", { url });

await new Promise((r) => setTimeout(r, wait));

if (logs.length === 0) {
  console.log("(no console output)");
} else {
  console.log(logs.join("\n"));
}

process.exit(0);
