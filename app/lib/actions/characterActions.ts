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
import { convertToFormData } from "../utils";
import { RelationsActions, SkillActions, StatsActions } from ".";

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
  relations: z.string().uuid(),
  stats: z.string().uuid(),
});

const CreateCharacter = CharacterFormSchema.omit({ id: true });
const ModifyCharacter = CharacterFormSchema.omit({
  user: true,
  composure: true,
  relations: true,
  stats: true,
});

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

export async function modifyCharacter(characterModificationForm: {
  character: {
    id: string;
    lastName: string;
    forename: string;
    age: string;
    sex: string;
    race: string;
    jobGroup: string;
    job: string;
    quality: string;
    fault: string;
    religion: string;
    nationality: string;
    magic: string;
    life: number;
    mana: number;
    fitness: number;
  };
  relations: {
    id: string;
    close: string;
    opposite: string;
    distant: string;
    enemy: string;
  };
  skills: {
    [key: string]: string;
  };
  stats: {
    id: string;
    intelligence: string;
    force: string;
    knowHow: string;
    will: string;
    constitution: string;
    social: string;
    power: string;
    agility: string;
    sociable: string;
  };
}) {
  try {
    console.log("début de la modification");
    const { life, mana, fitness, ...tmpCharacter } =
      characterModificationForm.character;
    const characterForm: FormData = convertToFormData(tmpCharacter);
    const relationsForm: FormData = convertToFormData(
      characterModificationForm.relations
    );
    const statsForm: FormData = convertToFormData(
      characterModificationForm.stats
    );

    const statsResult = await StatsActions.modifyStats(statsForm);
    if (statsResult.errors) {
      return statsResult;
    }

    const relationsResult = await RelationsActions.modifyRelations(
      relationsForm
    );
    if (relationsResult.errors) {
      return relationsResult;
    }

    const skillsResult = await SkillActions.modifyCharacterSkillsLinkMultiple(
      characterModificationForm.skills,
      characterModificationForm.character.id
    );
    if (skillsResult.errors) {
      return skillsResult;
    }

    const validatedFields = ModifyCharacter.safeParse({
      id: characterForm.get("id"),
      lastName: characterForm.get("lastName"),
      forename: characterForm.get("forename"),
      age: Number(characterForm.get("age")),
      sex: characterForm.get("sex"),
      race: characterForm.get("race"),
      jobGroup: characterForm.get("jobGroup"),
      job: characterForm.get("job"),
      quality: characterForm.get("quality"),
      fault: characterForm.get("fault"),
      religion: characterForm.get("religion"),
      nationality: characterForm.get("nationality"),
      magic: characterForm.get("magic"),
      life: Math.min(
        life,
        Number(characterModificationForm.stats.constitution) * 2
      ),
      mana: Math.min(
        mana,
        Number(characterModificationForm.stats.intelligence) +
          Number(characterModificationForm.stats.power)
      ),
      fitness: Math.min(
        fitness,
        Number(characterModificationForm.stats.force) +
          Number(characterModificationForm.stats.agility)
      ),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Échec de la modification de personnage : Champs invalides.",
      };
    }

    const character: Partial<typeof characterTable.$inferInsert> = {
      lastName: validatedFields.data.lastName,
      forename: validatedFields.data.forename,
      age: validatedFields.data.age,
      sex: validatedFields.data.sex,
      race: validatedFields.data.race,
      jobGroup: validatedFields.data.jobGroup,
      job: validatedFields.data.job,
      quality: validatedFields.data.quality,
      fault: validatedFields.data.fault,
      religion: validatedFields.data.religion,
      nationality: validatedFields.data.nationality,
      magic: validatedFields.data.magic,
      life: validatedFields.data.life,
      mana: validatedFields.data.mana,
      fitness: validatedFields.data.fitness,
    };

    await db
      .update(characterTable)
      .set(character)
      .where(eq(characterTable.id, validatedFields.data.id));
    return {
      message: "Succès de la modification de personnage",
    };
  } catch (error) {
    return {
      message: "Echec de la modification de personnage",
    };
  }
}

export async function insertCharacter(
  characterModificationForm: {
    character: {
      lastName: string;
      forename: string;
      age: string;
      sex: string;
      race: string;
      jobGroup: string;
      job: string;
      quality: string;
      fault: string;
      religion: string;
      nationality: string;
      magic: string;
      life: number;
      mana: number;
      fitness: number;
    };
    relations: {
      close: string;
      opposite: string;
      distant: string;
      enemy: string;
    };
    skills: {
      [key: string]: string;
    };
    stats: {
      intelligence: string;
      force: string;
      knowHow: string;
      will: string;
      constitution: string;
      social: string;
      power: string;
      agility: string;
      sociable: string;
    };
  },
  userEmail: string
) {
  try {
    console.log("début de l'insertion");
    const { life, mana, fitness, ...tmpCharacter } =
      characterModificationForm.character;
    const characterForm: FormData = convertToFormData(tmpCharacter);
    const relationsForm: FormData = convertToFormData(
      characterModificationForm.relations
    );
    const statsForm: FormData = convertToFormData(
      characterModificationForm.stats
    );

    const statsResult = await StatsActions.insertStats(statsForm);
    if (statsResult.errors) {
      console.log(statsResult.errors, statsResult.message);
      throw statsResult.message;
    }

    const relationsResult = await RelationsActions.insertRelations(
      relationsForm
    );
    if (relationsResult.errors) {
      console.log(relationsResult.errors);
      throw relationsResult.message;
    }

    const { userId } = (
      await db
        .select({ userId: usersTable.id })
        .from(usersTable)
        .where(eq(usersTable.email, userEmail))
    )[0];

    const validatedFields = CreateCharacter.safeParse({
      user: userId,
      relations: relationsResult.relationsId,
      stats: statsResult.statsId,
      lastName: characterForm.get("lastName"),
      forename: characterForm.get("forename"),
      age: Number(characterForm.get("age")),
      sex: characterForm.get("sex"),
      race: characterForm.get("race"),
      jobGroup: characterForm.get("jobGroup"),
      job: characterForm.get("job"),
      quality: characterForm.get("quality"),
      fault: characterForm.get("fault"),
      religion: characterForm.get("religion"),
      nationality: characterForm.get("nationality"),
      magic: characterForm.get("magic"),
      life: Number(characterModificationForm.stats.constitution) * 2,
      mana:
        Number(characterModificationForm.stats.intelligence) +
        Number(characterModificationForm.stats.power),
      fitness:
        Number(characterModificationForm.stats.force) +
        Number(characterModificationForm.stats.agility),
      composure: 20,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Échec de l'insertion de personnage : Champs invalides.",
      };
    }

    const character: typeof characterTable.$inferInsert = {
      user: validatedFields.data.user,
      composure: validatedFields.data.composure,
      relations: validatedFields.data.relations,
      stats: validatedFields.data.stats,
      lastName: validatedFields.data.lastName,
      forename: validatedFields.data.forename,
      age: validatedFields.data.age,
      sex: validatedFields.data.sex,
      race: validatedFields.data.race,
      jobGroup: validatedFields.data.jobGroup,
      job: validatedFields.data.job,
      quality: validatedFields.data.quality,
      fault: validatedFields.data.fault,
      religion: validatedFields.data.religion,
      nationality: validatedFields.data.nationality,
      magic: validatedFields.data.magic,
      life: validatedFields.data.life,
      mana: validatedFields.data.mana,
      fitness: validatedFields.data.fitness,
    };

    const result = await db
      .insert(characterTable)
      .values(character)
      .returning({ characterId: characterTable.id });

    console.log(result);

    const skillsResult = await SkillActions.insertCharacterSkillsLinkMultiple(
      characterModificationForm.skills,
      result[0].characterId
    );
    if (skillsResult.errors) {
      console.log(skillsResult.errors);
      throw skillsResult.message;
    }

    return {
      message: "Succès de l'insertion de personnage",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Echec de l'insertion de personnage",
    };
  }
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
