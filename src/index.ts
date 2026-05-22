import { withSupabase } from "@supabase/server/adapters/hono";
import { Hono } from "hono";
import { notFound } from "./features/404/index.js";
import {
  list as listLinks,
  post as postLink,
  removeLink,
} from "./features/link/controller.js";
import {
  get,
  getStats,
  post as postVisit,
} from "./features/visit/controller.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Well... this is Hono 👀🔥");
});

app.get("/health", (c) => {
  return c.text("OK 🔥");
});

app.notFound(notFound);

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
app.get("/api/go/:code", withSupabase({ auth: "none" }), postVisit);
/**
 * List all created links
 */
app.get("/api/links", withSupabase({ auth: "none" }), listLinks);
/**
 * See all visits for a link
 */
app.get("/api/links/:code/visits", withSupabase({ auth: "none" }), get);
/**
 * Aggregated stats (count, by source, etc.)
 */
app.get("/api/links/:code/stats", withSupabase({ auth: "none" }), getStats);
/**
 * Delete a link
 */
app.delete("/api/links/:code", withSupabase({ auth: "none" }), removeLink);

export default app;
