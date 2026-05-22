import { Context } from "hono";
import { createLink } from "./service.js";

//POST /api/links
export const postLink = async (c: Context) => {
  const { url } = await c.req.json();
  const link = await createLink(url);
  return c.json(link, 201);
};
