import { Context } from "hono";
import { createVisit, listStats, listVisits } from "./service.js";
import { getRequestMeta } from "./utils/userLookup.js";
// POST api/go/:code
export const post = async (c: Context) => {
  const code = c.req.param("code") as string;
  const { ip, userAgent, referrer } = getRequestMeta(c);
  const visitResponse = await createVisit(
    c.var.supabaseContext.supabase,
    code,
    {
      ip,
      userAgent,
      referrer,
    },
  );

  //
  // redirect to the full url of the link
  return c.redirect(visitResponse.redirectUrl, 302);
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
