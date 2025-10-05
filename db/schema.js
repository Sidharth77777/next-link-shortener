import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull(),
  shortUrl: text("short_url").notNull().unique(),
});
