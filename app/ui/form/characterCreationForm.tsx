"use client";

import IdentityCardForm from "./character/identityCardForm";
import BottomValidationButtons from "../bottomValidationButtons";
import RelationCardForm from "./character/relationCardForm";
import StatsCardForm from "./character/statsCardForm";
import { CharacterSkillLinkTable, SkillTable } from "@/app/db/schema";
import SkillsCardForm from "./character/skillsCardForm";
import { insertCharacter } from "@/app/lib/actions/characterActions";
import { redirect } from "next/navigation";
import { useReducer } from "react";
import { Xanh_Mono } from "next/font/google";

interface Props {
  defaultSkills: {
    skill: typeof SkillTable.$inferSelect;
    characterSkillLink: typeof CharacterSkillLinkTable.$inferSelect | null;
  }[];
  userEmail: string;
}

export default function CharacterCreationForm({
  defaultSkills,
  userEmail,
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
      lastName: "",
      forename: "",
      age: "",
      sex: "",
      race: "",
      jobGroup: "",
      job: "",
      quality: "",
      fault: "",
      religion: "",
      nationality: "",
      magic: "",
      life: "",
      mana: "",
      fitness: "",
    },
    relations: {
      close: "",
      opposite: "",
      distant: "",
      enemy: "",
    },
    skills: {},
    stats: {
      intelligence: "",
      force: "",
      knowHow: "",
      will: "",
      constitution: "",
      social: "",
      power: "",
      agility: "",
      sociable: "",
    },
  });

  const onValidate = async () => {
    const result = await insertCharacter(form, userEmail);
    console.log(result);
    if (result.errors) {
      console.log(result.message, result.errors);
    } else {
      redirect("/character");
    }
  };

  console.log(form);

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
      <BottomValidationButtons cancelRef="/" onValidate={onValidate} />
    </div>
  );
}
