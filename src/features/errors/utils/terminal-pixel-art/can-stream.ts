import { checkChafa } from "./chafa.js";
import { assetExists, resolveErrorConfig, type ErrorStatus } from "./config.js";

export function canStreamErrorArt(status: ErrorStatus): boolean {
  const config = resolveErrorConfig(status);
  return checkChafa() && assetExists(config.gif);
}
