"use server";

import { db } from "app/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  characterTable,
  relationsTable,
  statsTable,
  usersTable,
} from "../../db/schema";

export interface CharacterType {
  id: string;
  user: string;
  lastName: string;
  forename: string;
  composure: number;
  life: number;
  mana: number;
  fitness: number;
  age: number;
  sex: string;
  race: string;
  jobGroup: string;
  job: string;
  quality: string;
  fault: string;
  magic: string | null;
  religion: string | null;
  nationality: string;
}

export interface RelationsType {
  id: string;
  close: string;
  opposite: string;
  distant: string;
  enemy: string;
}

export interface StatsType {
  id: string;
  intelligence: number;
  will: number;
  power: number;
  force: number;
  constitution: number;
  agility: number;
  knowHow: number;
  social: number;
  sociable: number;
}

const CharacterFormSchema = z.object({
  id: z.string().uuid(),
  user: z.string().uuid(),
  lastName: z.string(),
  forename: z.string(),
  composure: z.number(),
  life: z.number(),
  mana: z.number(),
  fitness: z.number(),
  age: z.number(),
  sex: z.string(),
  race: z.string(),
  jobGroup: z.string(),
  job: z.string(),
  quality: z.string(),
  fault: z.string(),
  magic: z.string(),
  religion: z.string(),
  nationality: z.string(),
  close: z.string(),
  opposite: z.string(),
  distant: z.string(),
  enemy: z.string(),
  intelligence: z.number(),
  will: z.number(),
  power: z.number(),
  force: z.number(),
  constitution: z.number(),
  agility: z.number(),
  knowHow: z.number(),
  social: z.number(),
  sociable: z.number(),
});

const CreateCharacter = CharacterFormSchema.omit({ id: true, user: true });

export async function getCharacter(userEmail: string) {
  return db
    .select({
      character: characterTable,
      relations: relationsTable,
      stats: statsTable,
    })
    .from(characterTable)
    .innerJoin(usersTable, eq(usersTable.id, characterTable.user))
    .innerJoin(relationsTable, eq(characterTable.relations, relationsTable.id))
    .innerJoin(statsTable, eq(characterTable.stats, statsTable.id))
    .where(eq(usersTable.email, userEmail));
}

export async function setCurrentCharacterStat(
  stat: "life" | "mana" | "fitness" | "composure",
  value: number,
  characterId: string
) {
  await db
    .update(characterTable)
    .set({ [stat]: value })
    .where(eq(characterTable.id, characterId));
}
