import {
  pgTable,
  varchar,
  uuid,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
});

export const characterTable = pgTable("character", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user: uuid()
    .references(() => usersTable.id)
    .notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  forename: varchar({ length: 255 }).notNull(),
  composure: integer().notNull(),
  life: integer().notNull(),
  mana: integer().notNull(),
  fitness: integer().notNull(),
  age: integer().notNull(),
  sex: varchar({ length: 255 }).notNull(),
  race: varchar({ length: 255 }).notNull(),
  jobGroup: varchar({ length: 255 }).notNull(),
  job: varchar({ length: 255 }).notNull(),
  quality: varchar({ length: 255 }).notNull(),
  fault: varchar({ length: 255 }).notNull(),
  magic: varchar({ length: 255 }),
  religion: varchar({ length: 255 }),
  nationality: varchar({ length: 255 }).notNull(),
  relations: uuid()
    .references(() => relationsTable.id)
    .notNull(),
  stats: uuid()
    .references(() => statsTable.id)
    .notNull(),
  image: varchar({ length: 255 }),
});

export const relationsTable = pgTable("relations", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  close: varchar({ length: 255 }).notNull(),
  opposite: varchar({ length: 255 }).notNull(),
  distant: varchar({ length: 255 }).notNull(),
  enemy: varchar({ length: 255 }).notNull(),
});

export const statsTable = pgTable("stats", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  intelligence: integer().notNull(),
  will: integer().notNull(),
  power: integer().notNull(),
  force: integer().notNull(),
  constitution: integer().notNull(),
  agility: integer().notNull(),
  knowHow: integer().notNull(),
  social: integer().notNull(),
  sociable: integer().notNull(),
});

export const SkillTable = pgTable("skill", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  stat: varchar({ length: 255 }).notNull(),
  basic: boolean().default(false).notNull(),
});

export const CharacterSkillLinkTable = pgTable("characterSkillLink", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  character: uuid()
    .references(() => characterTable.id)
    .notNull(),
  skill: uuid()
    .references(() => SkillTable.id)
    .notNull(),
  points: integer().notNull(),
  innate: boolean().default(false).notNull(),
});
