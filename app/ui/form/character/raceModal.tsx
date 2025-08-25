"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { raceBonusTable } from "@/app/db/schema";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { Divider, input } from "@nextui-org/react";
import { tabs as skillsArray } from "./skillsCardForm";
import clsx from "clsx";

interface Props {
  charRace: {
    primaryRace?: typeof raceBonusTable.$inferSelect;
    raceName: string;
    race2?: { id: string; name: string };
    race3?: { id: string; name: string };
  };
  primeBlood: {
    id: string;
    race1: string;
    race2: string;
  }[];
  races: {
    race: {
      name: string;
      id: string;
      character: string | null;
      image: string | null;
      categorie: string;
      physique: string | null;
      active: string | null;
      passive: string | null;
      bloodType: string;
      playable: boolean;
    };
    bonus: (typeof raceBonusTable.$inferSelect)[];
  }[];
  setForm: (action: {
    type: string;
    value:
      | string
      | {
          primaryRace?: typeof raceBonusTable.$inferSelect;
          raceName: string;
          race2?: { id: string; name: string };
          race3?: { id: string; name: string };
        };
  }) => void;
}

const RaceModal = ({ charRace, primeBlood, races, setForm }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [raceForm, setRaceForm] = useState<{
    type?: string;
    purity: "Sang-pur" | "Croisé" | "Sang-mêlée" | string;
    race2?: string;
    race3?: string;
    stat1?:
      | "intelligence"
      | "will"
      | "power"
      | "force"
      | "constitution"
      | "agility"
      | "knowHow"
      | "social"
      | "sociable";
    stat2?:
      | "intelligence"
      | "will"
      | "power"
      | "force"
      | "constitution"
      | "agility"
      | "knowHow"
      | "social"
      | "sociable";
  }>({
    type: charRace.primaryRace?.type,
    purity: charRace.race3?.name
      ? "Sang-mêlée"
      : charRace.race2?.name
      ? "Croisé"
      : "Sang-pur",
    race2: charRace.race2?.name || undefined,
    race3: charRace.race3?.name || undefined,
    stat1: charRace.primaryRace?.stat1 || undefined,
    stat2: charRace.primaryRace?.stat2 || undefined,
  });

  const [primaryRace, setPrimaryRace] = useState<
    | {
        race: {
          name: string;
          id: string;
          character: string | null;
          image: string | null;
          categorie: string;
          physique: string | null;
          active: string | null;
          passive: string | null;
          bloodType: string;
          playable: boolean;
        };
        bonus: (typeof raceBonusTable.$inferSelect)[];
      }
    | undefined
  >(races.find((el) => el.race.id === charRace.primaryRace?.race));
  const [breadingList, setBreadingList] = useState<
    {
      race: {
        name: string;
        id: string;
        character: string | null;
        image: string | null;
        categorie: string;
        physique: string | null;
        active: string | null;
        passive: string | null;
        bloodType: string;
        playable: boolean;
      };
      bonus: (typeof raceBonusTable.$inferSelect)[];
    }[]
  >([]);

  const InputContainer = ({
    children,
    className,
    name,
  }: {
    children: any;
    className?: string;
    name: string;
  }) => (
    <div className="flex items-baseline justify-center">
      <label
        className={clsx("mb-3 mt-5 block text-xs font-medium", className)}
        htmlFor="email"
      >
        {name} : &nbsp;
      </label>
      <div className="relative">{children}</div>
    </div>
  );

  const onValidate = () => {
    const outputRace = {
      primaryRace: primaryRace?.bonus.find(
        (el) =>
          el.race === primaryRace.race.id &&
          (el.type === raceForm.type || el.type === "default") &&
          el.stat1 === raceForm.stat1 &&
          el.stat2 === raceForm.stat2
      ),
      raceName: primaryRace!.race.name,
      race2:
        raceForm.purity === "Sang-pur"
          ? undefined
          : {
              id: races.find((el) => el.race.name === raceForm.race2)!.race.id,
              name: raceForm.race2!,
            },
      race3:
        raceForm.purity === "Sang-mêlée"
          ? {
              id: races.find((el) => el.race.name === raceForm.race3)!.race.id,
              name: raceForm.race3!,
            }
          : undefined,
    };
    const isFormValid =
      outputRace.primaryRace !== undefined &&
      (raceForm.purity === "Sang-pur" ||
        (outputRace.race2?.name !== undefined &&
          outputRace.race2.id !== undefined &&
          (raceForm.purity === "Croisé" ||
            (outputRace.race3?.name !== undefined &&
              outputRace.race3.id !== undefined))));
    if (isFormValid) {
      setForm({
        type: "race",
        value: outputRace,
      });
      window.history.replaceState(null, "", pathname);
    }
  };

  const onTypeChange = (type: string) => {
    const typedBonus = primaryRace?.bonus.filter((el) => el.type === type);
    setRaceForm({
      ...raceForm,
      type: type,
      stat1:
        raceForm.stat1 &&
        typedBonus?.map((el) => el.stat1 as string).includes(raceForm.stat1)
          ? raceForm.stat1
          : undefined,
      stat2:
        raceForm.stat2 &&
        typedBonus?.map((el) => el.stat2 as string).includes(raceForm.stat2)
          ? raceForm.stat2
          : undefined,
    });
  };

  const updateBreadingList = (
    primaryRace:
      | {
          race: {
            name: string;
            id: string;
            character: string | null;
            image: string | null;
            categorie: string;
            physique: string | null;
            active: string | null;
            passive: string | null;
            bloodType: string;
            playable: boolean;
          };
          bonus: (typeof raceBonusTable.$inferSelect)[];
        }
      | undefined
  ) => {
    if (primaryRace?.race.bloodType === "Prime de sang") {
      const linkedPrimeBlood = primeBlood.filter(
        (primeBloodEl) => primeBloodEl.race1 === primaryRace.race.id
      );
      setBreadingList(
        races.filter((race) =>
          linkedPrimeBlood
            .map((primeBloodEl) => primeBloodEl.race2)
            .includes(race.race.id)
        )
      );
    } else if (primaryRace?.race.bloodType === "Sang Supérieur") {
      setBreadingList(
        races.filter(
          (race) =>
            race.race.bloodType === "Prime de sang" ||
            (race.race.bloodType === "Sang Supérieur" &&
              primaryRace.race.id !== race.race.id) ||
            race.race.bloodType === "Sang Dilué"
        )
      );
    } else if (primaryRace?.race.bloodType === "Sang Dilué") {
      const linkedPrimeBlood = primeBlood.filter(
        (primeBloodEl) => primeBloodEl.race2 === primaryRace.race.id
      );
      setBreadingList(
        races.filter(
          (race) =>
            (race.race.bloodType === "Sang Dilué" &&
              primaryRace.race.id !== race.race.id) ||
            linkedPrimeBlood
              .map((primeBloodEl) => primeBloodEl.race1)
              .includes(race.race.id)
        )
      );
    } else {
      setBreadingList([]);
    }
  };

  const onPrimaryRaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPrimaryRace(races.find((race) => e.target.value == race.race.name));
    setRaceForm({
      purity: "Sang-pur",
    });
  };

  useEffect(() => {
    updateBreadingList(primaryRace);
  }, [primaryRace]);

  const showRace = searchParams.get("showRace");
  return (
    <>
      <Link
        href={pathname + "?showRace=true"}
        className="block w-32 text-sm outline-2 text-foreground border-2 border-primary rounded-lg px-2 py-1 hover:bg-primary/80"
      >
        {charRace?.raceName +
          (charRace.race2
            ? ` / ${charRace.race2?.name}` +
              (charRace.race3 ? ` / ${charRace.race3?.name}` : "")
            : "")}
      </Link>
      {showRace && (
        <div className="fixed z-20 backdrop-blur-xs inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="p-8 w-[75%] h-[80%] shadow-lg rounded-md bg-content1">
            <div className="h-full flex flex-col justify-between text-center">
              <h3 className="text-2xl font-bold text-primary">Races</h3>
              <div
                style={
                  primaryRace
                    ? {
                        backgroundImage: `url(/upload/${primaryRace.race.image})`,
                      }
                    : {}
                }
                className="h-full flex flex-col shrink bg-right bg-content1/60 bg-contain bg-no-repeat bg-blend-overlay"
              >
                <InputContainer className="w-32 mb-8" name="Race principale">
                  <select
                    className="peer block w-38 rounded-md border p-2 text-sm outline-2 border-content2 bg-background/90 text-foreground"
                    onChange={onPrimaryRaceChange}
                    value={primaryRace?.race.name}
                  >
                    <option value={undefined} className="hidden">
                      Choisit une race
                    </option>
                    {races
                      .filter((race) => race.race.playable)
                      .map((race) => (
                        <option key={race.race.id} value={race.race.name}>
                          {race.race.name}
                        </option>
                      ))}
                  </select>
                </InputContainer>
                <div className="flex w-full justify-around">
                  {primaryRace && (
                    <>
                      <div className="h-full w-[40%] leading-10">
                        <div className="text-primary text-xl">Apparence</div>
                        <div className="text-sm">
                          {primaryRace.race.physique}
                        </div>
                        <Divider className="mt-8 primary mb-4 w-52 mx-auto" />
                        <div className="text-primary text-xl">Caractère</div>
                        <div className="text-sm">
                          {primaryRace.race.character}
                        </div>
                      </div>
                      <div className="h-full w-[40%]">
                        {breadingList.length > 0 && (
                          <div className="h-5 w-full flex h-8 items-center gap-4 justify-center">
                            <input
                              type="radio"
                              onChange={() =>
                                setRaceForm({
                                  ...raceForm,
                                  purity: "Sang-pur",
                                  race2: undefined,
                                  race3: undefined,
                                })
                              }
                              name="blood"
                              size={20}
                              checked={raceForm.purity === "Sang-pur"}
                              className="border-1 border-primary text-primary w-8 h-8 bg-content2/80"
                            />
                            <label className="mr-6">Sang-pur</label>
                            <input
                              type="radio"
                              onChange={() =>
                                setRaceForm({
                                  ...raceForm,
                                  purity: "Croisé",
                                  race3: undefined,
                                })
                              }
                              name="blood"
                              checked={raceForm.purity === "Croisé"}
                              className="border-1 border-primary text-primary w-8 h-8 bg-content2/80"
                            />
                            <label className="mr-6">Croisé</label>
                            <input
                              type="radio"
                              onChange={() =>
                                setRaceForm({
                                  ...raceForm,
                                  purity: "Sang-mêlée",
                                })
                              }
                              name="blood"
                              checked={raceForm.purity === "Sang-mêlée"}
                              className="border-1 border-primary text-primary w-8 h-8 bg-content2/80"
                            />
                            <label>Sang-mêlée</label>
                          </div>
                        )}
                        {raceForm.purity !== "Sang-pur" && (
                          <div className="flex justify-center flex-wrap gap-8">
                            <InputContainer className="w-16" name="Race 2">
                              <select
                                onChange={(e) =>
                                  setRaceForm({
                                    ...raceForm,
                                    race2: e.target.value,
                                    race3:
                                      raceForm.race3 === e.target.value
                                        ? undefined
                                        : raceForm.race3,
                                  })
                                }
                                value={raceForm.race2}
                                className="peer block rounded-md border p-2 text-xs outline-2 border-content2 bg-background/90 text-foreground"
                              >
                                <option value={undefined} className="hidden">
                                  Choisissez une race
                                </option>
                                {breadingList.map((race) => (
                                  <option
                                    key={race.race.id}
                                    value={race.race.name}
                                  >
                                    {race.race.name}
                                  </option>
                                ))}
                              </select>
                            </InputContainer>
                            {raceForm.purity === "Sang-mêlée" && (
                              <InputContainer className="w-16" name="Race 3">
                                <select
                                  onChange={(e) =>
                                    setRaceForm({
                                      ...raceForm,
                                      race3: e.target.value,
                                    })
                                  }
                                  value={raceForm.race3}
                                  className="peer block rounded-md border p-2 text-xs outline-2 border-content2 bg-background/90 text-foreground"
                                >
                                  <option value={undefined} className="hidden">
                                    Choisissez une race
                                  </option>
                                  {breadingList
                                    .filter(
                                      (race) =>
                                        raceForm.race2 !== race.race.name
                                    )
                                    .map((race) => (
                                      <option
                                        key={race.race.id}
                                        value={race.race.name}
                                      >
                                        {race.race.name}
                                      </option>
                                    ))}
                                </select>
                              </InputContainer>
                            )}
                          </div>
                        )}
                        {primaryRace.bonus[0].type !== "default" && (
                          <div className="h-5 w-full flex h-8 mt-4">
                            {primaryRace.bonus
                              .sort(
                                (bonus1, bonus2) =>
                                  (bonus2.bloodMax || 0) -
                                  (bonus1.bloodMax || 0)
                              )
                              .map((bonus) => bonus.type)
                              .filter(
                                (type, index, array) =>
                                  array.indexOf(type) === index
                              )
                              .map((type) => (
                                <button
                                  className={clsx(
                                    "border-1 border-primary text-primary grow h-8 bg-content2/80 first-of-type:rounded-s-xl last-of-type:rounded-e-xl ",
                                    type === raceForm.type
                                      ? "bg-primary/80 text-primary-foreground"
                                      : ""
                                  )}
                                  key={type}
                                  onClick={() => {
                                    if (type !== raceForm.type) {
                                      onTypeChange(type);
                                    }
                                  }}
                                >
                                  {type}
                                </button>
                              ))}
                          </div>
                        )}
                        <div className="mx-[15%] font-bold mt-4 text-left mb-1">
                          Stats
                        </div>
                        <div className="flex items-center">
                          <div className="mx-[10%] flex flex-col items-start">
                            {primaryRace.bonus
                              .filter(
                                (bonus) =>
                                  bonus.type === raceForm.type ||
                                  bonus.type === "default"
                              )
                              .map((bonus) => bonus.stat1)
                              .filter(
                                (value, index, array) =>
                                  array.indexOf(value) === index
                              )
                              .map((bonus) => (
                                <div
                                  key={bonus}
                                  className="flex items-center my-1"
                                >
                                  <input
                                    className="border-1 border-primary text-primary w-5 h-5 bg-content2/80 mr-2"
                                    name="stat1"
                                    onChange={() =>
                                      setRaceForm({
                                        ...raceForm,
                                        stat1: bonus!,
                                        stat2: primaryRace.bonus
                                          .filter(
                                            (bonus) =>
                                              bonus.stat1 === raceForm.stat1 &&
                                              (bonus.type === raceForm.type ||
                                                bonus.type === "default")
                                          )
                                          .map((bonus) => bonus.stat2)
                                          .includes(bonus)
                                          ? raceForm.stat2
                                          : undefined,
                                      })
                                    }
                                    size={20}
                                    type="radio"
                                    value={bonus!}
                                    checked={raceForm.stat1 === bonus}
                                  />
                                  <label>
                                    {
                                      skillsArray.find(
                                        (skill) => skill.name === bonus
                                      )?.label
                                    }
                                  </label>
                                </div>
                              ))}
                          </div>
                          <div className="grow">ET</div>
                          <div className="mx-[10%] flex items-start flex-col">
                            {primaryRace.bonus
                              .filter(
                                (bonus) =>
                                  bonus.type === raceForm.type ||
                                  bonus.type === "default"
                              )
                              .map((bonus) => bonus.stat2)
                              .filter(
                                (value, index, array) =>
                                  array.indexOf(value) === index
                              )
                              .map((bonus) => (
                                <div
                                  key={bonus}
                                  className="flex items-center my-1"
                                >
                                  <input
                                    className="border-1 border-primary text-primary w-5 h-5 bg-content2/80 mr-2"
                                    disabled={
                                      !primaryRace.bonus
                                        .filter(
                                          (bonus) =>
                                            bonus.stat1 === raceForm.stat1 &&
                                            (bonus.type === raceForm.type ||
                                              bonus.type === "default")
                                        )
                                        .map((bonus) => bonus.stat2)
                                        .includes(bonus)
                                    }
                                    name="stat2"
                                    onChange={() =>
                                      setRaceForm({
                                        ...raceForm,
                                        stat2: bonus!,
                                      })
                                    }
                                    size={20}
                                    type="radio"
                                    value={bonus!}
                                    checked={raceForm.stat2 === bonus}
                                  />
                                  <label>
                                    {
                                      skillsArray.find(
                                        (skill) => skill.name === bonus
                                      )?.label
                                    }
                                  </label>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="mx-[15%] font-bold mt-4 text-left mb-1">
                          Passif
                        </div>
                        <div className="mx-[15%] font-bold mt-4 text-left mb-1">
                          Actif
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-4 gap-4">
                {/* Navigates back to the base URL - closing the modal */}
                <button
                  className="px-4 py-2 bg-success-500 text-white text-base font-medium rounded-md shadow-xs hover:bg-gray-400 focus:outline-hidden focus:ring-2 focus:ring-gray-300"
                  onClick={onValidate}
                >
                  Valider
                </button>
                <Link
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-xs hover:bg-gray-400 focus:outline-hidden focus:ring-2 focus:ring-gray-300"
                  href={pathname}
                >
                  Annuler
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RaceModal;
