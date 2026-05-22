import type { Context } from "hono";
import { browserHtml } from "./browser.js";
import { canStreamErrorArt } from "./can-stream.js";
import { renderGifWithChafa } from "./chafa.js";
import { isTerminalClient, wantsStaticTerminalFrame } from "./client.js";
import { gifPath, resolveErrorConfig, type ErrorStatus } from "./config.js";

const CLEAR_AND_HIDE_CURSOR = "\x1b[2J\x1b[H\x1b[?25l";
const RESTORE_CURSOR = "\x1b[?25h";

export async function streamErrorResponse(
  c: Context,
  status: ErrorStatus,
): Promise<Response> {
  const config = resolveErrorConfig(status);
  const terminal = isTerminalClient(c);
  const gif = gifPath(config.gif);
  const streamable = canStreamErrorArt(status);

  if (!terminal) {
    return c.html(
      browserHtml(status, config.message, streamable),
      status,
    );
  }

  if (!streamable) {
    return c.text(`${status} - ${config.message}\n`, status);
  }

  const animate = !wantsStaticTerminalFrame(c);

  const stream = new ReadableStream({
    start(controller) {
      const proc = renderGifWithChafa(gif, { animate });
      const encoder = new TextEncoder();

      const enqueue = (text: string) =>
        controller.enqueue(encoder.encode(text));

      if (animate) {
        enqueue(CLEAR_AND_HIDE_CURSOR);
      }

      proc.stdout?.on("data", (chunk: Buffer) => {
        enqueue(chunk.toString());
      });

      proc.on("close", () => {
        if (animate) {
          enqueue(`${RESTORE_CURSOR}\n\n  ${config.message}\n\n`);
        } else {
          enqueue(`\n\n  ${config.message}\n\n`);
        }
        controller.close();
      });

      proc.on("error", (err) => {
        console.error("[terminal-pixel-art] chafa failed:", err);
        enqueue(`${status} - ${config.message}\n`);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "X-Content-Type-Options": "nosniff",
      "X-Accel-Buffering": "no",
    },
  });
}
