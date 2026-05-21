import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Well... this is Hono 👀🔥");
});

export default app;
