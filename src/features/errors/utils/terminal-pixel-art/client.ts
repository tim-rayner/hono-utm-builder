import type { Context } from "hono";

const TERMINAL_AGENTS = ["curl", "httpie", "wget", "got", "axios"];

export function isTerminalClient(c: Context): boolean {
  const ua = c.req.header("user-agent") ?? "";
  const accept = c.req.header("accept") ?? "";
  const explicit = c.req.header("x-terminal") === "true";

  if (explicit) return true;

  const isKnownCli = TERMINAL_AGENTS.some((agent) =>
    ua.toLowerCase().startsWith(agent.toLowerCase()),
  );

  const wantsHtml = accept.includes("text/html");

  return isKnownCli || (!wantsHtml && ua !== "");
}

/** Browser console: first frame only (no animation). */
export function wantsStaticTerminalFrame(c: Context): boolean {
  return c.req.header("x-terminal-static") === "true";
}
