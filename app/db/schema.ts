import {
  pgTable,
  varchar,
  uuid,
  text,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { string } from "zod";

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
  race: uuid()
    .references(() => characterRaceLinkTable.id)
    .notNull(),
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

export const skillTable = pgTable("skill", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  stat: varchar({ length: 255 }).notNull(),
  basic: boolean().default(false).notNull(),
});

export const characterSkillLinkTable = pgTable("characterSkillLink", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  character: uuid()
    .references(() => characterTable.id)
    .notNull(),
  skill: uuid()
    .references(() => skillTable.id)
    .notNull(),
  points: integer().notNull(),
  innate: boolean().default(false).notNull(),
});

export const raceTypeEnum = pgEnum("raceTypeEnum", [
  "Sang Petrifié",
  "Prime de Sang Royauté",
  "Prime de sang",
  "Sang Supérieur",
  "Sang Dilué",
]);

export const primeBloodTable = pgTable("primeBloodTable", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  race1: uuid()
    .references(() => raceTable.id)
    .notNull(),
  race2: uuid()
    .references(() => raceTable.id)
    .notNull(),
});

export const raceTable = pgTable("raceTable", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  categorie: varchar({ length: 255 }).notNull(),
  image: varchar({ length: 255 }),
  physique: text(),
  character: text(),
  active: uuid(),
  passive: uuid(),
  bloodType: raceTypeEnum().notNull(),
  playable: boolean().notNull(),
});

export const statEnum = pgEnum("statEnum", [
  "intelligence",
  "will",
  "power",
  "force",
  "constitution",
  "agility",
  "knowHow",
  "social",
  "sociable",
]);

export const raceBonusTable = pgTable("raceBonusTable", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  race: uuid()
    .references(() => raceTable.id)
    .notNull(),
  type: varchar({ length: 255 }).notNull(),
  stat1: statEnum(),
  stat2: statEnum(),
  bloodMax: integer(),
  bloodMin: integer(),
});

export const characterRaceLinkTable = pgTable("characterRaceLinkTable", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  primaryRace: uuid()
    .references(() => raceBonusTable.id)
    .notNull(),
  race2: uuid().references(() => raceTable.id),
  race3: uuid().references(() => raceTable.id),
});

export const itemTable = pgTable("itemTable", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  effect: text().notNull(),
  takesASlot: boolean().default(true).notNull(),
  stackable: boolean().notNull(),
});

export const characterItemLinkTable = pgTable("characterItemLinkTable", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  character: uuid()
    .references(() => characterTable.id)
    .notNull(),
  item: uuid()
    .references(() => itemTable.id)
    .notNull(),
  number: integer().default(1).notNull(),
  isEquipt: boolean().default(false).notNull(),
});
