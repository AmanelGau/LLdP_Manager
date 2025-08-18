"use server";

import { db } from "app/db";
import { and, eq, ExtractTablesWithRelations, inArray, or } from "drizzle-orm";
import { z } from "zod";
import { skillTable, characterSkillLinkTable } from "../../db/schema";

export interface SkillType {
  id: string;
  name: string;
  stat: string;
  basic: boolean;
}

export interface CharacterSkillLinkType {
  id: string;
  character: string;
  skill: string;
  points: number;
}

const SkillsFormSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  stat: z.string(),
  basic: z.boolean(),
});

const CharacterSkillLinkFormSchema = z.object({
  id: z.string().uuid(),
  character: z.string().uuid(),
  skill: z.string().uuid(),
  points: z.number(),
  innate: z.boolean().default(false),
});

const CreateCharacterSkillLink = CharacterSkillLinkFormSchema.omit({
  id: true,
});

export async function getSkills(characterId: string | null) {
  return await db
    .select({
      skill: skillTable,
      characterSkillLink: characterSkillLinkTable,
    })
    .from(skillTable)
    .leftJoin(
      characterSkillLinkTable,
      characterId === null
        ? eq(characterSkillLinkTable.skill, skillTable.id)
        : and(
            eq(characterSkillLinkTable.skill, skillTable.id),
            eq(characterSkillLinkTable.character, characterId)
          )
    )
    .where(
      characterId === null
        ? eq(skillTable.basic, true)
        : or(
            eq(characterSkillLinkTable.character, characterId),
            eq(skillTable.basic, true)
          )
    );
}

export async function modifyCharacterSkillsLinkMultiple(
  characterSkillsLinkForm: { [key: string]: string },
  characterId: string
) {
  try {
    const oldSkills = await getSkills(characterId);
    const listSkillsPoints = Object.entries(characterSkillsLinkForm);

    const skillsToRemove = oldSkills.filter(
      (oldSkill) =>
        oldSkill.characterSkillLink &&
        !listSkillsPoints
          .map((newSkill) => newSkill[0])
          .includes(oldSkill.skill.name)
    );
    const skillsToUpdate = oldSkills.filter(
      (oldSkill) =>
        oldSkill.characterSkillLink &&
        listSkillsPoints
          .map((newSkill) => newSkill[0])
          .includes(oldSkill.skill.name)
    );
    const skillsToAdd = oldSkills.filter(
      (oldSkill) =>
        !oldSkill.characterSkillLink &&
        listSkillsPoints
          .map((newSkill) => newSkill[0])
          .includes(oldSkill.skill.name)
    );

    await db.delete(characterSkillLinkTable).where(
      inArray(
        characterSkillLinkTable.id,
        skillsToRemove.map((oldSkill) => oldSkill.characterSkillLink!.id)
      )
    );

    await skillsToUpdate.forEach(async (oldSkill) => {
      await db
        .update(characterSkillLinkTable)
        .set({ points: Number(characterSkillsLinkForm[oldSkill.skill.name]) })
        .where(eq(characterSkillLinkTable.id, oldSkill.characterSkillLink!.id));
    });

    if (skillsToAdd.length !== 0) {
      const newSkillList = skillsToAdd.map((oldSkill) => {
        const validatedFields = CreateCharacterSkillLink.safeParse({
          character: characterId,
          skill: oldSkill.skill.id,
          points: Number(characterSkillsLinkForm[oldSkill.skill.name]),
        });

        if (!validatedFields.success) {
          throw validatedFields.error.flatten().fieldErrors;
        }
        return {
          character: validatedFields.data.character,
          skill: validatedFields.data.skill,
          points: validatedFields.data.points,
        };
      });
      await db.insert(characterSkillLinkTable).values(newSkillList);
    }
    return {
      message: "Succès de la modification de stats",
    };
  } catch (error) {
    return {
      errors: error,
      message: "Echec de la modification de stats",
    };
  }
}

export async function insertCharacterSkillsLinkMultiple(
  characterSkillsLinkForm: { [key: string]: string },
  characterId: string
) {
  try {
    const oldSkills = await getSkills(characterId);
    const listSkillsPoints = Object.entries(characterSkillsLinkForm);
    const skillsToAdd = oldSkills.filter(
      (oldSkill) =>
        !oldSkill.characterSkillLink &&
        listSkillsPoints
          .map((newSkill) => newSkill[0])
          .includes(oldSkill.skill.name)
    );

    if (skillsToAdd.length !== 0) {
      const newSkillList = skillsToAdd.map((oldSkill) => {
        const validatedFields = CreateCharacterSkillLink.safeParse({
          character: characterId,
          skill: oldSkill.skill.id,
          points: Number(characterSkillsLinkForm[oldSkill.skill.name]),
        });

        if (!validatedFields.success) {
          throw validatedFields.error.flatten().fieldErrors;
        }
        return {
          character: validatedFields.data.character,
          skill: validatedFields.data.skill,
          points: validatedFields.data.points,
        };
      });
      await db.insert(characterSkillLinkTable).values(newSkillList);
    }
    return {
      message: "Succès de la modification de stats",
    };
  } catch (error) {
    return {
      errors: error,
      message: "Echec de la modification de stats",
    };
  }
}
