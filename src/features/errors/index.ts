import type { Context } from "hono";
import { streamErrorResponse } from "./utils/terminal-pixel-art/stream.js";

export const notFound = (c: Context) => streamErrorResponse(c, 404);

export const onError = (err: Error, c: Context) => {
  console.error(err);
  return streamErrorResponse(c, 500);
};
