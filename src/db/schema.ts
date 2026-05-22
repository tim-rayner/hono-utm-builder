import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 64 }).notNull().unique(),
  baseUrl: text("base_url").notNull(),
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  utmTerm: varchar("utm_term", { length: 255 }),
  utmContent: varchar("utm_content", { length: 255 }),
  fullUrl: text("full_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  linkCode: varchar("link_code", { length: 64 })
    .notNull()
    .references(() => links.code),
  visitedAt: timestamp("visited_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  ip: varchar("ip", { length: 64 }),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
});

export type Link = typeof links.$inferSelect;
export type Visit = typeof visits.$inferSelect;
