import { pgTable, varchar, uuid, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
});
