import type { ErrorStatus } from "./config.js";
import { browserConsoleStreamScript } from "./console-script.js";

const GIF_BY_STATUS: Record<ErrorStatus, string> = {
  404: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExenY1MGlxZHJkOWVuanAyNjE5djF4c202ZjFrdHp4eW1lczA0OXNoNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sU511xfb7ORqw/giphy.gif",
  500: "https://media.giphy.com/media/gEOhB4Utd9ATfKogz/giphy.gif",
};

export function browserHtml(
  status: ErrorStatus,
  message: string,
  streamToConsole = false,
): string {
  const title = `${status} - Error`;
  const gif = GIF_BY_STATUS[status];

  return `<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <style>
      body {
        font-family: sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
        background: #0f0f0f;
        color: white;
      }
      img { border-radius: 12px; max-width: 400px; }
      h1 { font-size: 3rem; margin: 0.5rem 0; }
      p { color: #aaa; }
    </style>
  </head>
  <body>
    <img src="${gif}" alt="error" />
    <p>${message}</p>
    ${streamToConsole ? browserConsoleStreamScript(status) : ""}
  </body>
</html>`;
}
