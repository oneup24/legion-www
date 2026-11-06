/**
 * Visit every route and report console errors, missing translations and
 * unexpected HTTP statuses.
 *
 * Usage: node scripts/check-routes.mjs [baseUrl]
 */
const base = process.argv[2] || "http://localhost:3100/legion-www";
const port = 9222;

const ROUTES = [
  "/",
  "/product/",
  "/pricing/",
  "/about/",
  "/security/",
  "/use-cases/",
  "/use-cases/trading/",
  "/use-cases/professional-services/",
  "/partners/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/book/",
  "/zh-HK/",
  "/zh-HK/product/",
  "/zh-HK/pricing/",
  "/zh-HK/about/",
  "/zh-HK/security/",
  "/zh-HK/use-cases/",
  "/zh-HK/use-cases/trading/",
  "/zh-HK/use-cases/professional-services/",
  "/zh-HK/partners/",
  "/zh-HK/contact/",
  "/zh-HK/privacy/",
  "/zh-HK/terms/",
];

async function openTab(url) {
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
    if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
      const text = (msg.params.args || [])
        .map((a) => a.value ?? a.description ?? "")
        .join(" ");
      logs.push(text.split("\n")[0]);
    }
    if (msg.method === "Runtime.exceptionThrown") {
      const d = msg.params.exceptionDetails;
      logs.push(`EXCEPTION ${d.text} ${d.exception?.description ?? ""}`.split("\n")[0]);
    }
  };

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const mid = ++id;
      pending.set(mid, resolve);
      ws.send(JSON.stringify({ id: mid, method, params }));
    });

  await send("Runtime.enable");
  await send("Page.enable");
  return { ws, send, logs };
}

let failures = 0;

for (const route of ROUTES) {
  const url = `${base}${route}`;
  const { ws, send, logs } = await openTab(url);

  const statusPromise = send("Network.enable").then(() =>
    send("Network.responseReceived"),
  );
  await send("Page.navigate", { url });
  await new Promise((r) => setTimeout(r, 2600));

  let status = "?";
  const res = await fetch(url, { redirect: "follow" });
  status = res.status;

  const bad = logs.filter(
    (l) =>
      /MISSING_MESSAGE|Error|error|Warning|hydrat/i.test(l) &&
      !/favicon/i.test(l),
  );

  if (status !== 200) {
    console.log(`✗ ${route} → HTTP ${status}`);
    failures++;
  } else if (bad.length) {
    console.log(`✗ ${route} → ${bad.length} console issue(s)`);
    bad.slice(0, 3).forEach((b) => console.log(`    ${b.slice(0, 220)}`));
    failures++;
  } else {
    console.log(`✓ ${route} → 200, clean`);
  }

  ws.close();
}

console.log(failures === 0 ? `\nall ${ROUTES.length} routes clean` : `\n${failures} route(s) with issues`);
process.exit(failures === 0 ? 0 : 1);
