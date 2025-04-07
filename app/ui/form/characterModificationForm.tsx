"use client";

import { useReducer } from "react";
import IdentityCardForm from "./character/identityCardForm";
import BottomValidationButtons from "../bottomValidationButtons";
import RelationCardForm from "./character/relationCardForm";
import StatsCardForm from "./character/statsCardForm";
import {
  characterTable,
  CharacterSkillLinkTable,
  SkillTable,
  statsTable,
  relationsTable,
} from "@/app/db/schema";
import SkillsCardForm from "./character/skillsCardForm";
import { modifyCharacter } from "@/app/lib/actions/characterActions";
import { redirect } from "next/navigation";

interface Props {
  defaultCharacter: typeof characterTable.$inferSelect;
  defaultRelations: typeof relationsTable.$inferSelect;
  defaultSkills: {
    skill: typeof SkillTable.$inferSelect;
    characterSkillLink: typeof CharacterSkillLinkTable.$inferSelect | null;
  }[];
  defaultStats: typeof statsTable.$inferSelect;
}

export default function CharacterModificationForm({
  defaultCharacter,
  defaultRelations,
  defaultSkills,
  defaultStats,
}: Props) {
  const formReducer = (
    form: any,
    action: { type: string; key?: string; value: string | number }
  ) => {
    switch (action.type) {
      case "lastName":
      case "forename":
      case "composure":
      case "age":
      case "sex":
      case "race":
      case "jobGroup":
      case "job":
      case "quality":
      case "fault":
      case "religion":
      case "nationality":
      case "magic":
        return {
          ...form,
          character: {
            ...form.character,
            [action.type]: action.value,
          },
        };
      case "close":
      case "opposite":
      case "distant":
      case "enemy":
        return {
          ...form,
          relations: {
            ...form.relations,
            [action.type]: action.value,
          },
        };
      case "intelligence":
      case "force":
      case "knowHow":
      case "will":
      case "constitution":
      case "social":
      case "power":
      case "agility":
      case "sociable":
        return {
          ...form,
          stats: {
            ...form.stats,
            [action.type]: action.value,
          },
        };
      case "skill":
        console.log("test1");
        if (!action.key) {
          console.log("test2");
          throw Error("key is empty");
        }
        if (action.value === "0") {
          return {
            ...form,
            skills: {
              ...form.skills,
              [action.key]: undefined,
            },
          };
        } else {
          return {
            ...form,
            skills: {
              ...form.skills,
              [action.key]: action.value,
            },
          };
        }
    }
  };

  const [form, dispatch] = useReducer(formReducer, {
    character: {
      id: defaultCharacter.id,
      lastName: defaultCharacter.lastName,
      forename: defaultCharacter.forename,
      age: defaultCharacter.age,
      sex: defaultCharacter.sex,
      race: defaultCharacter.race,
      jobGroup: defaultCharacter.jobGroup,
      job: defaultCharacter.job,
      quality: defaultCharacter.quality,
      fault: defaultCharacter.fault,
      religion: defaultCharacter.religion,
      nationality: defaultCharacter.nationality,
      magic: defaultCharacter.magic,
      life: defaultCharacter.life,
      mana: defaultCharacter.mana,
      fitness: defaultCharacter.fitness,
    },
    relations: {
      id: defaultRelations.id,
      close: defaultRelations.close,
      opposite: defaultRelations.opposite,
      distant: defaultRelations.distant,
      enemy: defaultRelations.enemy,
    },
    skills: Object.fromEntries(
      defaultSkills
        .filter((skill) => skill.characterSkillLink)
        .map((skill) => [
          skill.skill.name,
          `${skill.characterSkillLink?.points}`,
        ])
    ),
    stats: {
      id: defaultStats.id,
      intelligence: defaultStats.intelligence,
      force: defaultStats.force,
      knowHow: defaultStats.knowHow,
      will: defaultStats.will,
      constitution: defaultStats.constitution,
      social: defaultStats.social,
      power: defaultStats.power,
      agility: defaultStats.agility,
      sociable: defaultStats.sociable,
    },
  });

  const onValidate = async () => {
    const result = await modifyCharacter(form);
    if (result.errors) {
      console.log(result.message, result.errors);
    } else {
      redirect("/character");
    }
  };

  return (
    <div className="space-y-3">
      <IdentityCardForm character={form.character} setForm={dispatch} />
      <RelationCardForm relations={form.relations} setForm={dispatch} />
      <StatsCardForm setForm={dispatch} stats={form.stats} />
      <SkillsCardForm
        setForm={dispatch}
        skills={form.skills}
        skillsList={defaultSkills}
        stats={form.stats}
      />
      <BottomValidationButtons cancelRef="/character" onValidate={onValidate} />
    </div>
  );
}
