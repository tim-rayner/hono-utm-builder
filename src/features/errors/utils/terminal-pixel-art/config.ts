import { existsSync } from "node:fs";
import { join } from "node:path";

export type ErrorStatus = 404 | 500;

export const ERROR_CONFIG: Record<
  ErrorStatus,
  { gif: string; message: string }
> = {
  404: {
    gif: "404.gif",
    message: "We can't seem to find that page",
  },
  500: {
    gif: "500.gif",
    message: "500 — everything is fine 🔥",
  },
};

export const DEFAULT_ERROR_CONFIG = {
  gif: "404.gif",
  message: "something went wrong",
};

const assetsDir = join(process.cwd(), "assets");

export function gifPath(filename: string): string {
  return join(assetsDir, filename);
}

export function resolveErrorConfig(status: number) {
  return ERROR_CONFIG[status as ErrorStatus] ?? DEFAULT_ERROR_CONFIG;
}

export function assetExists(filename: string): boolean {
  return existsSync(gifPath(filename));
}

for (const { gif } of Object.values(ERROR_CONFIG)) {
  if (!assetExists(gif)) {
    console.warn(`[terminal-pixel-art] missing asset: ${gifPath(gif)}`);
  }
}
