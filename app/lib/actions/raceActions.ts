"use server";

import { db } from "@/app/db";
import { eq, ExtractTablesWithRelations } from "drizzle-orm";
import { NeonHttpQueryResultHKT } from "drizzle-orm/neon-http";
import { PgTransaction } from "drizzle-orm/pg-core";
import {
  characterRaceLinkTable,
  primeBloodTable,
  raceBonusTable,
  raceTable,
} from "@/app/db/schema";
import { z } from "zod";

export async function getRaces() {
  const races = await db.select().from(raceTable);
  const result = [];
  for (let i = 0; i < races.length; i++) {
    const bonus = await db
      .select()
      .from(raceBonusTable)
      .where(eq(raceBonusTable.race, races[i].id))
      .execute();
    result.push({
      race: races[i],
      bonus,
    });
  }
  return result;
}

export async function getPrimeBlood() {
  return await db.select().from(primeBloodTable);
}

const RaceFormSchema = z.object({
  id: z.string().uuid(),
  primaryRace: z.string().uuid(),
  race2: z.string().uuid().nullable(),
  race3: z.string().uuid().nullable(),
});

const ModifyRace = RaceFormSchema;
const InsertRace = RaceFormSchema.omit({ id: true });

export async function insertCharacterRaceLink(
  raceForm: FormData,
  tx?: PgTransaction<
    NeonHttpQueryResultHKT,
    typeof import("@/app/db/schema"),
    ExtractTablesWithRelations<typeof import("@/app/db/schema")>
  >
) {
  try {
    const validatedFields = InsertRace.safeParse({
      primaryRace: raceForm.get("primaryRace"),
      race2: raceForm.has("race2") ? raceForm.get("race2") : null,
      race3: raceForm.has("race3") ? raceForm.get("race3") : null,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message:
          "Échec de l'insertion de la race du personnage : Champs invalides.",
      };
    }
    const race: typeof characterRaceLinkTable.$inferInsert = {
      primaryRace: validatedFields.data.primaryRace,
      race2: validatedFields.data.race2,
      race3: validatedFields.data.race3,
    };

    const result = await (tx || db)
      .insert(characterRaceLinkTable)
      .values(race)
      .returning({ charaRaceId: characterRaceLinkTable.id });

    return {
      charaRaceId: result[0].charaRaceId,
      message: "Succès de l'insertion de relations",
    };
  } catch (error) {
    return {
      message: "Echec de l'insertion de relations",
    };
  }
}

export async function modifyCharacterRaceLink(
  raceForm: FormData,
  tx?: PgTransaction<
    NeonHttpQueryResultHKT,
    typeof import("c:/Users/yohga/Desktop/Dev/LLdP_Manager/app/db/schema"),
    ExtractTablesWithRelations<
      typeof import("c:/Users/yohga/Desktop/Dev/LLdP_Manager/app/db/schema")
    >
  >
) {
  try {
    const validatedFields = ModifyRace.safeParse({
      id: raceForm.get("id"),
      primaryRace: raceForm.get("primaryRace"),
      race2: raceForm.has("race2") ? raceForm.get("race2") : null,
      race3: raceForm.has("race3") ? raceForm.get("race3") : null,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message:
          "Échec de la modification de la race du personnage : Champs invalides.",
      };
    }
    const race: typeof characterRaceLinkTable.$inferInsert = {
      primaryRace: validatedFields.data.primaryRace,
      race2: validatedFields.data.race2,
      race3: validatedFields.data.race3,
    };

    await (tx || db)
      .update(characterRaceLinkTable)
      .set(race)
      .where(eq(characterRaceLinkTable.id, validatedFields.data.id));
    return {
      message: "Succès de la modification de la race du personnage",
    };
  } catch (error) {
    return {
      message: "Echec de la modification de la race du personnage",
    };
  }
}
