import { authenticate } from "../../lib/basic-auth.js";

export default async function basicAuth(request, context) {
  const denied = await authenticate(
    request.headers.get("authorization"),
    Netlify.env.get("BASIC_AUTH_USER"),
    Netlify.env.get("BASIC_AUTH_PASSWORD")
  );
  if (denied) return denied;

  const response = await context.next();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { path: "/*" };
