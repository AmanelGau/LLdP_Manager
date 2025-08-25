"use server";

import { db } from "app/db";
import { eq, ExtractTablesWithRelations } from "drizzle-orm";
import { NeonHttpQueryResultHKT } from "drizzle-orm/neon-http";
import { PgTransaction } from "drizzle-orm/pg-core";
import { z } from "zod";
import { relationsTable } from "../../db/schema";
import { convertToFormData } from "../utils";

export interface RelationsType {
  id: string;
  close: string;
  opposite: string;
  distant: string;
  enemy: string;
}
const RelationsFormSchema = z.object({
  id: z.string().uuid(),
  close: z.string(),
  opposite: z.string(),
  distant: z.string(),
  enemy: z.string(),
});

const ModifyRelations = RelationsFormSchema;
const InsertRelations = RelationsFormSchema.omit({ id: true });

export async function modifyRelations(
  relationsForm: FormData,
  tx?: PgTransaction<
    NeonHttpQueryResultHKT,
    typeof import("@/app/db/schema"),
    ExtractTablesWithRelations<typeof import("@/app/db/schema")>
  >
) {
  try {
    const validatedFields = ModifyRelations.safeParse({
      id: relationsForm.get("id"),
      close: relationsForm.get("close"),
      opposite: relationsForm.get("opposite"),
      distant: relationsForm.get("distant"),
      enemy: relationsForm.get("enemy"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Échec de la modification de relations : Champs invalides.",
      };
    }
    const relations: typeof relationsTable.$inferInsert = {
      close: validatedFields.data.close,
      opposite: validatedFields.data.opposite,
      distant: validatedFields.data.distant,
      enemy: validatedFields.data.enemy,
    };

    await (tx || db)
      .update(relationsTable)
      .set(relations)
      .where(eq(relationsTable.id, validatedFields.data.id));
    return {
      message: "Succès de la modification de relations",
    };
  } catch (error) {
    return {
      message: "Echec de ma modification de relations",
    };
  }
}

export async function insertRelations(
  relationsForm: FormData,
  tx?: PgTransaction<
    NeonHttpQueryResultHKT,
    typeof import("@/app/db/schema"),
    ExtractTablesWithRelations<typeof import("@/app/db/schema")>
  >
) {
  try {
    const validatedFields = InsertRelations.safeParse({
      close: relationsForm.get("close"),
      opposite: relationsForm.get("opposite"),
      distant: relationsForm.get("distant"),
      enemy: relationsForm.get("enemy"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Échec de l'insertion de relations : Champs invalides.",
      };
    }
    const relations: typeof relationsTable.$inferInsert = {
      close: validatedFields.data.close,
      opposite: validatedFields.data.opposite,
      distant: validatedFields.data.distant,
      enemy: validatedFields.data.enemy,
    };

    const result = await (tx || db)
      .insert(relationsTable)
      .values(relations)
      .returning({ relationsId: relationsTable.id });

    return {
      relationsId: result[0].relationsId,
      message: "Succès de l'insertion de relations",
    };
  } catch (error) {
    return {
      message: "Echec de l'insertion de relations",
    };
  }
}
