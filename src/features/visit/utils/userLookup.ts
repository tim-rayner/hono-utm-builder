// look up user IP and user agent from network request
import type { Context } from "hono";
import { getConnInfo } from "hono/vercel";

export function getRequestMeta(c: Context) {
  const ip = getConnInfo(c).remote.address ?? null;
  return {
    ip,
    userAgent: c.req.header("user-agent") ?? null,
    referrer: c.req.header("referer") ?? null, // HTTP spells it "referer"
  };
}
