const encoder = new TextEncoder();

export async function authenticate(authorization, username, password) {
  const headers = { "Cache-Control": "private, no-store" };

  if (!username || !password || username.includes(":")) {
    return new Response("Authentication is not configured", { status: 503, headers });
  }

  const match = /^Basic +([A-Za-z0-9+/]+={0,2})$/i.exec(authorization || "");
  let credentials;
  try {
    if (match) {
      credentials = new TextDecoder("utf-8", { fatal: true }).decode(
        Uint8Array.from(atob(match[1]), (character) => character.charCodeAt(0))
      );
    }
  } catch {
    // Invalid Base64 or UTF-8 is treated as an authentication failure.
  }

  if (credentials !== undefined) {
    const [actual, expected] = await Promise.all(
      [credentials, `${username}:${password}`].map(async (value) =>
        new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)))
      )
    );
    let difference = 0;
    for (let index = 0; index < expected.length; index += 1) {
      difference |= actual[index] ^ expected[index];
    }
    if (difference === 0) return null;
  }

  return new Response("Authentication required", {
    status: 401,
    headers: { ...headers, "WWW-Authenticate": 'Basic realm="Spielzeiten", charset="UTF-8"' }
  });
}
