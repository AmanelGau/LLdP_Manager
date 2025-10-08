"use server";

import { db } from "@/app/db";
import {
  and,
  eq,
  ExtractTablesWithRelations,
  inArray,
  not,
  or,
} from "drizzle-orm";
import { NeonHttpQueryResultHKT } from "drizzle-orm/neon-http";
import { PgTransaction } from "drizzle-orm/pg-core";
import {
  characterRaceLinkTable,
  primeBloodTable,
  raceBonusTable,
  raceTable,
  raceTypeEnum,
  statEnum,
} from "@/app/db/schema";
import fs from "node:fs/promises";
import { z } from "zod";

const RaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  categorie: z.string(),
  image: z
    .custom<File>()
    .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
      message: "L'image doit faire au maximum 10 Mo.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Seuls les images peuvent envoyés.",
    }),
  physique: z.string().nullable(),
  character: z.string().nullable(),
  active: z.optional(z.string().nullable()),
  passive: z.optional(z.string().nullable()),
  bloodType: z.enum(raceTypeEnum.enumValues),
  playable: z.boolean(),
});

const RaceBonusSchema = z.object({
  id: z.string().uuid(),
  race: z.string().uuid(),
  type: z.string(),
  stat1: z.enum(statEnum.enumValues),
  stat2: z.enum(statEnum.enumValues),
  bloodMax: z.number(),
  bloodMin: z.number(),
});

const PrimeBloodSchema = z.object({
  id: z.string().uuid(),
  race1: z.string().uuid(),
  race2Array: z.array(z.string().uuid()),
});

const characterRaceLinkFormSchema = z.object({
  id: z.string().uuid(),
  primaryRace: z.string().uuid(),
  race2: z.string().uuid().nullable(),
  race3: z.string().uuid().nullable(),
});

const ModifyRace = RaceSchema;
const InsertRace = RaceSchema.omit({ id: true });

const ModifyRaceBonus = RaceBonusSchema;
const InsertRaceBonus = RaceBonusSchema.omit({ id: true });

const ModifyPrimeBlood = PrimeBloodSchema;
const InsertPrimeBlood = PrimeBloodSchema.omit({ id: true });

const ModifyCharacterRaceLink = characterRaceLinkFormSchema;
const InsertCharacterRaceLink = characterRaceLinkFormSchema.omit({ id: true });

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

export async function getBreedingRaces(race?: string) {
  const requestWhere = race
    ? and(
        not(eq(raceTable.name, race)),
        or(
          eq(raceTable.bloodType, raceTypeEnum.enumValues[2]),
          eq(raceTable.bloodType, raceTypeEnum.enumValues[4])
        )
      )
    : or(
        eq(raceTable.bloodType, raceTypeEnum.enumValues[2]),
        eq(raceTable.bloodType, raceTypeEnum.enumValues[4])
      );
  return (
    await db
      .select({ name: raceTable.name })
      .from(raceTable)
      .where(requestWhere)
      .execute()
  ).map((el) => el.name);
}

export async function insertRace(
  form: {
    bloodType: {
      name: string;
      max: string;
      min: string;
      stats: { stat1: string | undefined; stat2: string | undefined }[];
    }[];
    breedingRace: string[];
    categorie: string;
    character: string;
    image: File | null;
    name: string;
    physique: string;
    playable: boolean;
    type: string;
  },
  tx?: PgTransaction<
    NeonHttpQueryResultHKT,
    typeof import("@/app/db/schema"),
    ExtractTablesWithRelations<typeof import("@/app/db/schema")>
  >
) {
  try {
    const validatedFields = InsertRace.safeParse({
      name: form.name,
      categorie: form.categorie,
      image: form.image,
      physique: form.physique,
      character: form.character,
      bloodType: form.type,
      playable: form.playable,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Échec de l'insertion de race : Champs invalides.",
      };
    }

    const arrayBuffer = await validatedFields.data.image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    await fs.writeFile(
      `./public/upload/Race_${validatedFields.data.name}.png`,
      buffer
    );

    if (
      validatedFields.data.bloodType === "Prime de sang" &&
      form.breedingRace.length === 0
    ) {
      return {
        errors: "Races de croisement vide (Prime de sang)",
        message: "Échec de l'insertion de race : Champs invalides.",
      };
    }

    const race: typeof raceTable.$inferInsert = {
      name: validatedFields.data.name,
      categorie: validatedFields.data.categorie,
      image: `Race_${validatedFields.data.name}.png`,
      physique: validatedFields.data.physique,
      character: validatedFields.data.character,
      bloodType: validatedFields.data.bloodType,
      playable: validatedFields.data.playable,
    };

    const result = await (tx || db)
      .insert(raceTable)
      .values(race)
      .returning({ raceId: raceTable.id });

    await form.bloodType.map(async (bloodType) => {
      await bloodType.stats.map(async (stats) => {
        const raceBonusResult = await insertRaceBonus({
          max: bloodType.max,
          min: bloodType.min,
          name: bloodType.name,
          stat1: stats.stat1,
          stat2: stats.stat2,
          race: result[0].raceId,
        });
        if (raceBonusResult.errors) {
          throw raceBonusResult.errors;
        }
      });
    });

    if (validatedFields.data.bloodType === "Prime de sang") {
      insertPrimeBloodArray({
        race1Id: result[0].raceId,
        race2Array: form.breedingRace,
      });
    }

    return {
      raceId: result[0].raceId,
      message: "Succès de l'insertion de race",
    };
  } catch (error) {
    return {
      message: "Echec de l'insertion de race",
    };
  }
}

async function insertRaceBonus(
  form: {
    max: string;
    min: string;
    name: string;
    stat1: string | undefined;
    stat2: string | undefined;
    race: string;
  },
  tx?: PgTransaction<
    NeonHttpQueryResultHKT,
    typeof import("@/app/db/schema"),
    ExtractTablesWithRelations<typeof import("@/app/db/schema")>
  >
) {
  try {
    const validatedFields = InsertRaceBonus.safeParse({
      type: form.name,
      stat1: form.stat1,
      stat2: form.stat2,
      bloodMax: Number(form.max),
      bloodMin: Number(form.min),
      race: form.race,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Échec de l'insertion de bonus de race : Champs invalides.",
      };
    }

    const raceBonus: typeof raceBonusTable.$inferInsert = {
      type: validatedFields.data.type,
      stat1: validatedFields.data.stat1,
      stat2: validatedFields.data.stat2,
      bloodMax: validatedFields.data.bloodMax,
      bloodMin: validatedFields.data.bloodMin,
      race: validatedFields.data.race,
    };

    const result = await (tx || db)
      .insert(raceBonusTable)
      .values(raceBonus)
      .returning({ raceBonusId: raceBonusTable.id });
    return {
      raceBonusId: result[0].raceBonusId,
      message: "Succès de l'insertion de bonus de race",
    };
  } catch (error) {
    console.error("Echec de l'insertion de bonus de race");
    return {
      message: "Echec de l'insertion de bonus de race",
    };
  }
}

async function insertPrimeBloodArray(
  form: {
    race1Id: string;
    race2Array: string[];
  },
  tx?: PgTransaction<
    NeonHttpQueryResultHKT,
    typeof import("@/app/db/schema"),
    ExtractTablesWithRelations<typeof import("@/app/db/schema")>
  >
) {
  try {
    const validatedRaceBonusFields = InsertPrimeBlood.safeParse({
      race1: form.race1Id,
      race2Array: form.race2Array,
    });

    if (!validatedRaceBonusFields.success) {
      return {
        errors: validatedRaceBonusFields.error.flatten().fieldErrors,
        message:
          "Échec de l'insertion de race de croisement (Prime de sang) : Champs invalides.",
      };
    }

    const race2IdArray = await db
      .select({ name: raceTable.id })
      .from(raceTable)
      .where(inArray(raceTable.name, validatedRaceBonusFields.data.race2Array));

    const primeBlood: (typeof primeBloodTable.$inferInsert)[] =
      race2IdArray.map((race2) => ({
        race1: validatedRaceBonusFields.data.race1,
        race2: race2.name,
      }));

    const result = await (tx || db)
      .insert(primeBloodTable)
      .values(primeBlood)
      .returning({ primeBloodId: primeBloodTable.id });
    return {
      primeBloodId: result.map((result) => result.primeBloodId),
      message: "Succès de l'insertion de bonus de race",
    };
  } catch (error) {
    console.error("Echec de l'insertion de bonus de race");
    return {
      message: "Echec de l'insertion de bonus de race",
    };
  }
}

export async function insertCharacterRaceLink(
  raceForm: FormData,
  tx?: PgTransaction<
    NeonHttpQueryResultHKT,
    typeof import("@/app/db/schema"),
    ExtractTablesWithRelations<typeof import("@/app/db/schema")>
  >
) {
  try {
    const validatedFields = InsertCharacterRaceLink.safeParse({
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
    typeof import("@/app/db/schema"),
    ExtractTablesWithRelations<typeof import("@/app/db/schema")>
  >
) {
  try {
    const validatedFields = ModifyCharacterRaceLink.safeParse({
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
