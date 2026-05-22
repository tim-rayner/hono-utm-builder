import { db } from "../../db/client.js";
import { links } from "../../db/schema.js";

// Create Link Service
export const createLinkService = async (url: string) => {
  const link = await db
    .insert(links)
    .values({
      fullUrl: url,
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
      code: crypto.randomUUID().slice(0, 6),
    })
    .returning();
  return link[0];
};
