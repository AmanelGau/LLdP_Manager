"use server";

import { db } from "app/db";
import { eq, ExtractTablesWithRelations } from "drizzle-orm";
import { z } from "zod";
import { statsTable } from "../../db/schema";
import { PgTransaction } from "drizzle-orm/pg-core";
import { NeonHttpQueryResultHKT } from "drizzle-orm/neon-http";

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

const StatsFormSchema = z.object({
  id: z.string().uuid(),
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

const ModifyStats = StatsFormSchema;
const InsertStats = StatsFormSchema.omit({ id: true });

export async function modifyStats(
  statsForm: FormData,
  tx?: PgTransaction<
    NeonHttpQueryResultHKT,
    typeof import("@/app/db/schema"),
    ExtractTablesWithRelations<typeof import("@/app/db/schema")>
  >
) {
  try {
    const validatedFields = ModifyStats.safeParse({
      id: statsForm.get("id"),
      intelligence: Number(statsForm.get("intelligence")),
      force: Number(statsForm.get("force")),
      knowHow: Number(statsForm.get("knowHow")),
      will: Number(statsForm.get("will")),
      constitution: Number(statsForm.get("constitution")),
      social: Number(statsForm.get("social")),
      power: Number(statsForm.get("power")),
      agility: Number(statsForm.get("agility")),
      sociable: Number(statsForm.get("sociable")),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Échec de la modification de stats : Champs invalides.",
      };
    }

    const stats: typeof statsTable.$inferInsert = {
      intelligence: validatedFields.data.intelligence,
      force: validatedFields.data.force,
      knowHow: validatedFields.data.knowHow,
      will: validatedFields.data.will,
      constitution: validatedFields.data.constitution,
      social: validatedFields.data.social,
      power: validatedFields.data.power,
      agility: validatedFields.data.agility,
      sociable: validatedFields.data.sociable,
    };

    await (tx || db)
      .update(statsTable)
      .set(stats)
      .where(eq(statsTable.id, validatedFields.data.id));
    return {
      message: "Succès de la modification de stats",
    };
  } catch (error) {
    return {
      message: "Echec de la modification de stats",
    };
  }
}

export async function insertStats(
  statsForm: FormData,
  tx?: PgTransaction<
    NeonHttpQueryResultHKT,
    typeof import("@/app/db/schema"),
    ExtractTablesWithRelations<typeof import("@/app/db/schema")>
  >
) {
  try {
    const validatedFields = InsertStats.safeParse({
      intelligence: Number(statsForm.get("intelligence")),
      force: Number(statsForm.get("force")),
      knowHow: Number(statsForm.get("knowHow")),
      will: Number(statsForm.get("will")),
      constitution: Number(statsForm.get("constitution")),
      social: Number(statsForm.get("social")),
      power: Number(statsForm.get("power")),
      agility: Number(statsForm.get("agility")),
      sociable: Number(statsForm.get("sociable")),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Échec de l'insertion de stats : Champs invalides.",
      };
    }

    const stats: typeof statsTable.$inferInsert = {
      intelligence: validatedFields.data.intelligence,
      force: validatedFields.data.force,
      knowHow: validatedFields.data.knowHow,
      will: validatedFields.data.will,
      constitution: validatedFields.data.constitution,
      social: validatedFields.data.social,
      power: validatedFields.data.power,
      agility: validatedFields.data.agility,
      sociable: validatedFields.data.sociable,
    };

    const result = await (tx || db)
      .insert(statsTable)
      .values(stats)
      .returning({ statsId: statsTable.id });
    return {
      statsId: result[0].statsId,
      message: "Succès de l'insertion de stats",
    };
  } catch (error) {
    return {
      message: "Echec de l'insertion de stats",
    };
  }
}
