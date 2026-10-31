import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import test from "node:test";
import { authenticate } from "../lib/basic-auth.js";
import basicAuth, { config } from "../netlify/edge-functions/basic-auth.js";

const username = "tester";
const password = "sicher:mit:Umlaut-ä";
const authorization = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;

test("accepts valid UTF-8 credentials and passwords containing colons", async () => {
  assert.equal(await authenticate(authorization, username, password), null);
  assert.equal(await authenticate(authorization.replace("Basic", "basic"), username, password), null);
});

test("rejects missing, incorrect and malformed credentials with a browser challenge", async () => {
  for (const header of [undefined, "Bearer token", "Basic !!!", "Basic A", "Basic /w==", "Basic dGVzdGVyOndyb25n"]) {
    const response = await authenticate(header, username, password);
    assert.equal(response.status, 401);
    assert.match(response.headers.get("www-authenticate"), /^Basic /);
    assert.equal(response.headers.get("cache-control"), "private, no-store");
  }
});

test("fails closed for missing or invalid configuration", async () => {
  for (const [user, pass] of [[undefined, password], [username, undefined], ["", password], [username, ""], ["invalid:user", password]]) {
    assert.equal((await authenticate(authorization, user, pass)).status, 503);
  }
});

test("Netlify protects all paths and only continues after authentication", async (t) => {
  const original = globalThis.Netlify;
  globalThis.Netlify = { env: { get: (key) => ({ BASIC_AUTH_USER: username, BASIC_AUTH_PASSWORD: password })[key] } };
  t.after(() => { globalThis.Netlify = original; });
  assert.equal(config.path, "/*");
  let calls = 0;
  const context = { next: async () => { calls += 1; return new Response("protected asset"); } };
  assert.equal((await basicAuth(new Request("https://example.com/src/main.js"), context)).status, 401);
  assert.equal(calls, 0);
  const response = await basicAuth(new Request("https://example.com/src/main.js", { headers: { authorization } }), context);
  assert.equal(calls, 1);
  assert.equal(await response.text(), "protected asset");
  assert.equal(response.headers.get("cache-control"), "private, no-store");
});

test("local server protects HTML and assets over HTTP", async (t) => {
  const probe = createServer();
  probe.listen(0, "127.0.0.1");
  await once(probe, "listening");
  const port = probe.address().port;
  await new Promise((resolve, reject) => probe.close((error) => error ? reject(error) : resolve()));
  const child = spawn(process.execPath, ["server.mjs"], {
    env: { ...process.env, PORT: String(port), BASIC_AUTH_USER: username, BASIC_AUTH_PASSWORD: password },
    stdio: ["ignore", "pipe", "pipe"]
  });
  t.after(async () => {
    if (child.exitCode === null) {
      const exited = once(child, "exit");
      child.kill();
      await exited;
    }
  });
  await Promise.race([
    once(child.stdout, "data"),
    once(child, "exit").then(() => { throw new Error("Server exited before listening"); })
  ]);
  for (const path of ["/", "/src/main.js", "/src/matches.json"]) {
    const url = `http://127.0.0.1:${port}${path}`;
    assert.equal((await fetch(url)).status, 401);
    assert.equal((await fetch(url, { headers: { authorization: "Basic d3Jvbmc6d3Jvbmc=" } })).status, 401);
    const response = await fetch(url, { headers: { authorization } });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.ok((await response.text()).length > 0);
  }
});
