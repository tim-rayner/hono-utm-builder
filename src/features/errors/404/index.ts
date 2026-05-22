import { Context } from "hono";

export const notFound = (c: Context) => {
  return c.html(
    `<!DOCTYPE html>
  <html>
    <head>
      <title>404 - Not Found</title>
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
      <img src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif" alt="lost" />
      <p>Uh oh... we're having trouble finding tdhat page 🧐</p>
    </body>
  </html>`,
    404,
  );
};
