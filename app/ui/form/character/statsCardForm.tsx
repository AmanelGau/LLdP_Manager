"use client";

import { ReactNode, useEffect, useState } from "react";
import Card from "../../card";
import { raceBonusTable } from "@/app/db/schema";
import { Tooltip } from "@nextui-org/react";

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
      <Tooltip content={tooltipContent}>
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
        Points à répartir : {points}
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
          Un trop grand nombre de stat actuellement au maximum ({maxPoints})
        </div>
      )}
      <InputContainer
        name="Intelligence"
        tooltipContent={
          <>
            Détermine le niveau d'intelligence de votre personnage
            <br /> et augmente son mana max.
            <br /> Influe sur les connaissances de votre personnage.
          </>
        }
      >
        <Input stat="intelligence" />
      </InputContainer>
      <InputContainer
        name="Force"
        tooltipContent={
          <>
            Détermine le niveau de force de votre personnage
            <br /> et augmente sa forme max.
          </>
        }
      >
        <Input stat="force" />
      </InputContainer>
      <InputContainer
        name="Savoir-faire"
        tooltipContent={
          <>Détermine le niveau de savoir-faire de votre personnage.</>
        }
      >
        <Input stat="knowHow" />
      </InputContainer>
      <InputContainer
        name="Volonté"
        tooltipContent={
          <>
            Détermine le niveau de volonté de votre personnage.
            <br /> Influe sur la perception de votre personnage.
          </>
        }
      >
        <Input stat="will" />
      </InputContainer>
      <InputContainer
        name="Constitution"
        tooltipContent={
          <>
            Détermine le niveau de constitution de votre personnage
            <br /> et augmente ses points de vie max.
          </>
        }
      >
        <Input stat="constitution" />
      </InputContainer>
      <InputContainer
        name="Social"
        tooltipContent={
          <>
            Détermine le niveau de social de votre personnage.
            <br /> Influe sur ses capacités à influencer les autres personnages.
          </>
        }
      >
        <Input stat="social" />
      </InputContainer>
      <InputContainer
        name="Pouvoir"
        tooltipContent={
          <>
            Détermine le niveau de pouvoir de votre personnage
            <br /> et augmente son mana max.
            <br /> Influe sur les capacités magiques de votre personnage.
          </>
        }
      >
        <Input stat="power" />
      </InputContainer>
      <InputContainer
        name="Agilité"
        tooltipContent={
          <>
            Détermine le niveau d'agilité de votre personnages
            <br /> et augmente sa forme max.
          </>
        }
      >
        <Input stat="agility" />
      </InputContainer>
      <InputContainer
        name="Sociable"
        tooltipContent={
          <>
            Détermine le niveau de sociable de votre personnage.
            <br /> Influe sur l'image (hors physique) que renvoit votre
            personnage aux autres.
          </>
        }
      >
        <Input stat="sociable" />
      </InputContainer>
      <InputContainer
        name="Mana max"
        tooltipContent={
          <>
            La quantité maximale de mana de votre personnage (intelligence +
            pouvoir).
            <br /> Le mana permet de lancer des sorts.
          </>
        }
      >
        {Number(stats.intelligence) + Number(stats.power)}
      </InputContainer>
      <InputContainer
        name="Forme max"
        tooltipContent={
          <>
            La quantité maximale de forme de votre personnage (force + agilité).
            <br /> La forme permet d'utiliser des techniques de formes.
          </>
        }
      >
        {Number(stats.force) + Number(stats.agility)}
      </InputContainer>
      <InputContainer
        name="Point de vie max"
        tooltipContent={
          <>
            La quantité maximale de points de vie de votre personnage
            (consitution x 2).
          </>
        }
      >
        {Number(stats.constitution) * 2}
      </InputContainer>
    </Card>
  );
};

export default StatsCardForm;
