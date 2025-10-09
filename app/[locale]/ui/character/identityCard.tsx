"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { setCurrentCharacterStat } from "@/app/[locale]/lib/actions/characterActions";
import NumberInuptOnclick from "../numberInuptOnclick";
import { characterTable, statsTable } from "@/app/db/schema";
import { useI18n } from "@/app/local/client";

interface Props {
  characterData: typeof characterTable.$inferSelect;
  race: string;
  stats: typeof statsTable.$inferSelect;
}

const IdentityCard = ({ characterData, race, stats }: Props) => {
  const t = useI18n();
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
      <div>
        {t("common.name")}&nbsp;:&nbsp;{characterData.lastName}
      </div>
      <div>
        {t("common.first_name")}&nbsp;:&nbsp;{characterData.forename}
      </div>
      <div className="flex justify-center">
        {t("character.composure")}&nbsp;:&nbsp;
        <NumberInuptOnclick
          initalValue={composure}
          inputClassName="w-[1.5em]"
          onValidate={onInputValidate("composure")}
        />
        &nbsp;/&nbsp;20
      </div>
      <div className="flex justify-center">
        {t("character.life")}&nbsp;:&nbsp;
        <NumberInuptOnclick
          initalValue={life}
          inputClassName="w-[1.5em]"
          onValidate={onInputValidate("life")}
        />
        &nbsp;/&nbsp;{maxLife}
      </div>
      <div className="flex justify-center">
        {t("character.mana")}&nbsp;:&nbsp;
        <NumberInuptOnclick
          initalValue={mana}
          inputClassName="w-[1.5em]"
          onValidate={onInputValidate("mana")}
        />
        &nbsp;/&nbsp;{maxMana}
      </div>
      <div className="flex justify-center">
        {t("character.fitness")}&nbsp;:&nbsp;
        <NumberInuptOnclick
          initalValue={fitness}
          inputClassName="w-[1.5em]"
          onValidate={onInputValidate("fitness")}
        />
        &nbsp;/&nbsp;{maxFitness}
      </div>
      <div>
        {t("character.wound_threshold")}&nbsp;:&nbsp;{stats.constitution}
      </div>
      <div>
        {t("character.absence_threshold")}&nbsp;:&nbsp;
        {Math.floor(stats.will / 2)}
      </div>
      <div>
        {t("character.exhaustion_threshold")}&nbsp;:&nbsp;
        {Math.floor(stats.constitution / 2)}
      </div>
      {isOpen && (
        <>
          <div>
            {t("character.age")}&nbsp;:&nbsp;{characterData.age}
          </div>
          <div>
            {t("character.sex")}&nbsp;:&nbsp;{characterData.sex}
          </div>
          <div>
            {t("race.single")}&nbsp;:&nbsp;{race}
          </div>
          <div>
            {t("character.jobGroup")}&nbsp;:&nbsp;{characterData.jobGroup}
          </div>
          <div>
            {t("character.quality")}&nbsp;:&nbsp;{characterData.quality}
          </div>
          <div>
            {t("character.fault")}&nbsp;:&nbsp;{characterData.fault}
          </div>
          <div>
            {t("character.job")}&nbsp;:&nbsp;{characterData.job}
          </div>
          <div>
            {t("character.magic")}&nbsp;:&nbsp;{characterData.magic}
          </div>
          <div>
            {t("character.religion")}&nbsp;:&nbsp;{characterData.religion}{" "}
          </div>
          <div>
            {t("character.nationality")}&nbsp;:&nbsp;{characterData.nationality}
          </div>
          <div>
            {t("character.level")}&nbsp;:&nbsp;{characterData.level}
          </div>
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
