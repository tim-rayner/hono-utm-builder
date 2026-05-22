import { Context } from "hono";
import { createLinkService } from "./createLinkService.js";

//POST /api/links
export const postLink = async (c: Context) => {
  const { url } = await c.req.json();
  const link = await createLinkService(url);
  return c.json(link, 201);
};
