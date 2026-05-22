import { Context } from "hono";
import { createLink, deleteLink, getAll } from "./service.js";

//POST /api/links
export const post = async (c: Context) => {
  const { url } = await c.req.json();
  const linksResponse = await createLink(c.var.supabaseContext.supabase, url);
  return c.json(linksResponse, 201);
};

// GET /api/links
export const list = async (c: Context) => {
  const links = await getAll(c.var.supabaseContext.supabase);
  return c.json(links, 200);
};

// DELETE /api/links/:code
export const removeLink = async (c: Context) => {
  const code = c.req.param("code") as string;
  const link = await deleteLink(c.var.supabaseContext.supabase, code);
  return c.json(link, 200);
};
