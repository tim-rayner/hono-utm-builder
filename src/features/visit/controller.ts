import { Context } from "hono";
import { createVisit, listStats, listVisits } from "./service.js";
// POST api/go/:code
export const post = async (c: Context) => {
  const code = c.req.param("code") as string;
  const visit = await createVisit(c.var.supabaseContext.supabase, code);
  return c.json(visit, 201);
};

// GET api/go/:code/visits
export const get = async (c: Context) => {
  const code = c.req.param("code") as string;
  const visits = await listVisits(c.var.supabaseContext.supabase, code);
  return c.json(visits, 200);
};

// GET api/go/:code/stats
export const getStats = async (c: Context) => {
  const code = c.req.param("code") as string;
  const stats = await listStats(c.var.supabaseContext.supabase, code);
  return c.json(stats, 200);
};
