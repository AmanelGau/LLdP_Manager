"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { setCurrentCharacterStat } from "@/app/lib/actions/characterActions";
import NumberInuptOnclick from "../numberInuptOnclick";
import { characterTable, statsTable } from "@/app/db/schema";

interface Props {
  characterData: typeof characterTable.$inferSelect;
  race: string;
  stats: typeof statsTable.$inferSelect;
}

const IdentityCard = ({ characterData, race, stats }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [composure, setComposure] = useState<number>(characterData.composure);
  const [life, setLife] = useState<number>(characterData.life);
  const [mana, setMana] = useState<number>(characterData.mana);
  const [fitness, setFitness] = useState<number>(characterData.fitness);
  const maxLife = stats.constitution * 2;
  const maxMana = stats.intelligence + stats.power;
  const maxFitness = stats.force + stats.agility;

  const onInputValidate = (
    inputType: "life" | "mana" | "fitness" | "composure"
  ) => {
    return (value: number) => {
      switch (inputType) {
        case "composure":
          if (value > 20) return false;
          setComposure(value);
          break;
        case "life":
          if (value > maxLife) return false;
          setLife(value);
          break;
        case "mana":
          if (value > maxMana) return false;
          setMana(value);
          break;
        case "fitness":
          if (value > maxFitness) return false;
          setFitness(value);
          break;
      }
      setCurrentCharacterStat(inputType, value, characterData.id);
      return true;
    };
  };

  return (
    <div className="bg-content2 -m-4 mb-0 p-2 sticky -top-4 grid grid-flow-row grid-cols-1 md:grid-cols-3 text-center gap-2 transition ease-in-out duration-200 transition-[height] group shadow-[0_0_15px_-3px_black,0_0px_6px_-4px_black]">
      <div>Nom : {characterData.lastName}</div>
      <div>Prenom : {characterData.forename}</div>
      <div className="flex justify-center">
        Sang-froid : &nbsp;
        <NumberInuptOnclick
          initalValue={composure}
          inputClassName="w-[1.5em]"
          onValidate={onInputValidate("composure")}
        />
        &nbsp; / 20
      </div>
      <div className="flex justify-center">
        Santé : &nbsp;
        <NumberInuptOnclick
          initalValue={life}
          inputClassName="w-[1.5em]"
          onValidate={onInputValidate("life")}
        />
        &nbsp; / {maxLife}
      </div>
      <div className="flex justify-center">
        Mana : &nbsp;
        <NumberInuptOnclick
          initalValue={mana}
          inputClassName="w-[1.5em]"
          onValidate={onInputValidate("mana")}
        />
        &nbsp; / {maxMana}
      </div>
      <div className="flex justify-center">
        Forme : &nbsp;
        <NumberInuptOnclick
          initalValue={fitness}
          inputClassName="w-[1.5em]"
          onValidate={onInputValidate("fitness")}
        />
        &nbsp; / {maxFitness}
      </div>
      <div>Seuil de Blessure : {stats.constitution} </div>
      <div>Seuil d'Absence : {Math.floor(stats.will / 2)} </div>
      <div>Seuil de fatigue : {Math.floor(stats.constitution / 2)} </div>
      {isOpen && (
        <>
          <div>Age : {characterData.age}</div>
          <div>Sexe : {characterData.sex}</div>
          <div>Race : {race}</div>
          <div>Groupe de métier : {characterData.jobGroup}</div>
          <div>Qualité : {characterData.quality}</div>
          <div>Défaut : {characterData.fault}</div>
          <div>Métier : {characterData.job}</div>
          <div>Magie : {characterData.magic}</div>
          <div>Religion : {characterData.religion} </div>
          <div>Nationnalité : {characterData.nationality}</div>
        </>
      )}
      <ChevronDownIcon
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "col-span-1 md:col-span-3 h-0 m-auto cursor-pointer transition ease-in-out duration-200 transition-[height,transform] group-hover:h-8",
          isOpen ? "rotate-180" : "rotate-0"
        )}
      />
    </div>
  );
};

export default IdentityCard;
