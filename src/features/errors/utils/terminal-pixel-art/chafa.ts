import { execSync, spawn, type ChildProcess } from "node:child_process";

let chafaAvailable: boolean | null = null;

export function checkChafa(): boolean {
  if (chafaAvailable !== null) return chafaAvailable;
  try {
    execSync("which chafa", { stdio: "ignore" });
    chafaAvailable = true;
  } catch {
    chafaAvailable = false;
  }
  return chafaAvailable;
}

export function renderGifWithChafa(
  gifPath: string,
  options: { animate?: boolean } = {},
): ChildProcess {
  const animate = options.animate !== false;
  const args = [
    "--format",
    "symbols",
    "--size",
    "60x20",
    "--animate",
    animate ? "on" : "off",
  ];
  if (animate) {
    args.push("--duration", "5");
  }
  args.push(gifPath);
  return spawn("chafa", args);
}
