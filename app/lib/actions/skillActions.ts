"use server";

import { db } from "app/db";
import { eq, or } from "drizzle-orm";
import { z } from "zod";
import {
  characterTable,
  SkillTable,
  CharacterSkillLinkTable,
} from "../../db/schema";

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

export async function getSkills(characterId: string) {
  return await db
    .select({
      skill: SkillTable,
      characterSkillLink: CharacterSkillLinkTable,
    })
    .from(SkillTable)
    .leftJoin(
      CharacterSkillLinkTable,
      eq(CharacterSkillLinkTable.skill, SkillTable.id)
    )
    .where(
      or(
        eq(CharacterSkillLinkTable.character, characterId),
        eq(SkillTable.basic, true)
      )
    );
}
