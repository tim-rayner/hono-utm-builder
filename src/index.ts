import { Hono } from "hono";
import { withSupabase } from "@supabase/server/adapters/hono";
import { postLink } from "./features/link/controller.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Well... this is Hono 👀🔥");
});

app.get("/health", (c) => {
  return c.text("OK 🔥");
});

app.notFound((c) => {
  return c.text(
    "Uh oh... we're having trouble finding that page 🧐 please try again later.",
    404,
  );
});

app.onError((err, c) => {
  console.error(err);
  return c.text("Doh! Something went wrong 🤦‍♂️ Please try again later.", 500);
});

/**
 * Create a tracked UTM link
 */
app.post("/api/links", withSupabase({ auth: "none" }), postLink);
/**
 * Log visit + redirect
 */
app.get("/api/go/:code", async (c) => {});
/**
 * List all created links
 */
app.get("/api/links", async (c) => {});
/**
 * See all visits for a link
 */
app.get("/api/links/:code/visits", async (c) => {});
/**
 * Aggregated stats (count, by source, etc.)
 */
app.get("api/links/:code/stats", async (c) => {});
/**
 * Delete a link
 */
app.delete("/api/links/:code", async (c) => {});

export default app;
