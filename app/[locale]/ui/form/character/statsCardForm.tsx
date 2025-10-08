"use client";

import { ReactNode, useEffect, useState } from "react";
import Card from "../../card";
import { raceBonusTable } from "@/app/db/schema";
import { Tooltip } from "@nextui-org/react";
import { useI18n } from "@/app/local/client";

interface Props {
  level: number;
  race: {
    primaryRace?: typeof raceBonusTable.$inferSelect;
    raceName: string;
    race2?: {
      id: string;
      name: string;
    };
    race3?: {
      id: string;
      name: string;
    };
  };
  setForm: (action: { type: string; value: string }) => void;
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
}

const StatsCardForm = ({ level, race, stats, setForm }: Props) => {
  const t = useI18n();
  const [points, setPoints] = useState<number>(90);
  const [maxPoints, setMaxPoints] = useState<number>(14);

  const InputContainer = ({
    name,
    children,
    tooltipContent,
  }: {
    name: string;
    children: any;
    tooltipContent: ReactNode;
  }) => (
    <div className="flex items-baseline justify-center">
      <Tooltip
        classNames={{ content: "whitespace-pre" }}
        content={tooltipContent}
      >
        <label
          className="mb-3 mt-5 block text-xs font-medium w-28"
          htmlFor="email"
        >
          {name} : &nbsp;
        </label>
      </Tooltip>

      <div className="relative">{children}</div>
    </div>
  );

  const Input = ({
    stat,
  }: {
    stat:
      | "intelligence"
      | "will"
      | "power"
      | "force"
      | "constitution"
      | "agility"
      | "knowHow"
      | "social"
      | "sociable";
  }) => {
    return (
      <input
        className="peer block w-24 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
        defaultValue={stats[stat]}
        id={stat}
        type="number"
        name={stat}
        onBlur={(e) => setForm({ type: stat, value: e.target.value })}
        placeholder=""
        required
        min={
          (stat === "power" ? 1 : 5) +
          (race.primaryRace?.stat1 === stat || race.primaryRace?.stat2 === stat
            ? 1
            : 0)
        }
        max={
          maxPoints +
          (race.primaryRace?.stat1 === stat || race.primaryRace?.stat2 === stat
            ? 1
            : 0)
        }
      />
    );
  };

  useEffect(() => {
    let newPoints = 90 + (race.primaryRace ? 2 : 0) + 2 * level;
    if (level >= 9) {
      newPoints++;
      if (level === 10) {
        newPoints += 2;
      }
    }

    Object.entries(stats).forEach((stat) => {
      if (stat[0] !== "id") {
        newPoints -= Number(stat[1]);
      }
    });
    setPoints(newPoints);
    setMaxPoints(
      level === 10
        ? 18
        : level >= 8
        ? 17
        : level >= 5
        ? 16
        : level >= 1
        ? 15
        : 14
    );
  }, [stats, level, race]);

  return (
    <Card className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-2">
      <h3 className="text-center col-span-1 md:col-span-3">
        {`${t("stat.to_allocate")} : ${points}`}
      </h3>
      {Object.entries(stats).filter(
        (stat) =>
          stat[0] !== "id" &&
          Number(stat[1]) -
            (race.primaryRace?.stat1 === stat[0] ||
            race.primaryRace?.stat2 === stat[0]
              ? 1
              : 0) >=
            maxPoints
      ).length > 1 && (
        <div className="text-red-500 text-center col-span-1 md:col-span-3">
          {t("stat.too_much_max", { maxPoints })}
        </div>
      )}
      <InputContainer
        name={t("stat.intelligence")}
        tooltipContent={t("stat.intelligence_tooltip")}
      >
        <Input stat="intelligence" />
      </InputContainer>
      <InputContainer
        name={t("stat.force")}
        tooltipContent={t("stat.force_tooltip")}
      >
        <Input stat="force" />
      </InputContainer>
      <InputContainer
        name={t("stat.knowHow")}
        tooltipContent={t("stat.knowHow_tooltip")}
      >
        <Input stat="knowHow" />
      </InputContainer>
      <InputContainer
        name={t("stat.will")}
        tooltipContent={t("stat.will_tooltip")}
      >
        <Input stat="will" />
      </InputContainer>
      <InputContainer
        name={t("stat.constitution")}
        tooltipContent={t("stat.constitution_tooltip")}
      >
        <Input stat="constitution" />
      </InputContainer>
      <InputContainer
        name={t("stat.social")}
        tooltipContent={t("stat.social_tooltip")}
      >
        <Input stat="social" />
      </InputContainer>
      <InputContainer
        name={t("stat.power")}
        tooltipContent={t("stat.power_tooltip")}
      >
        <Input stat="power" />
      </InputContainer>
      <InputContainer
        name={t("stat.agility")}
        tooltipContent={t("stat.agility_tooltip")}
      >
        <Input stat="agility" />
      </InputContainer>
      <InputContainer
        name={t("stat.sociable")}
        tooltipContent={t("stat.sociable_tooltip")}
      >
        <Input stat="sociable" />
      </InputContainer>
      <InputContainer
        name={t("character.max_mana")}
        tooltipContent={t("character.max_mana_tooltip")}
      >
        {Number(stats.intelligence) + Number(stats.power)}
      </InputContainer>
      <InputContainer
        name={t("character.max_fitness")}
        tooltipContent={t("character.max_fitness_tooltip")}
      >
        {Number(stats.force) + Number(stats.agility)}
      </InputContainer>
      <InputContainer
        name={t("character.max_health")}
        tooltipContent={t("character.max_health_tooltip")}
      >
        {Number(stats.constitution) * 2}
      </InputContainer>
    </Card>
  );
};

export default StatsCardForm;
