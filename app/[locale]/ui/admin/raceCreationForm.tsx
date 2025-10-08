"use client";

import { raceTypeEnum, statEnum } from "@/app/db/schema";
import clsx from "clsx";
import React, { useEffect, useReducer, useRef, useState } from "react";
import Image from "next/image";
import BottomValidationButtons from "../bottomValidationButtons";
import { redirect } from "next/navigation";
import { insertRace } from "@/app/[locale]/lib/actions/raceActions";
import { useI18n } from "@/app/local/client";

interface Props {
  breedingRaces: string[];
}

const InputContainer = ({
  children,
  className,
  column,
  full,
  large,
  name,
}: {
  children: any;
  className?: string;
  column?: boolean;
  full?: boolean;
  large?: boolean;
  name: string;
}) => (
  <div
    className={clsx(
      "flex items-baseline justify-center",
      column ? "flex-col" : "",
      full ? "w-full" : ""
    )}
  >
    <label
      className={clsx(
        "mb-3 mt-5 block font-medium",
        large ? "text-lg" : "text-sm",
        className
      )}
    >
      {name} : &nbsp;
    </label>
    <div className={clsx(full ? "w-full" : "")}>{children}</div>
  </div>
);

const RaceCreationForm = ({ breedingRaces }: Props) => {
  const t = useI18n();
  const [activeBloodType, setActiveBloodType] = useState<number>(0);
  const [preview, setPreview] = useState<string>();
  const [form, dispatch] = useReducer<
    {
      bloodType: {
        name: string;
        max: string;
        min: string;
        stats: { stat1: string | undefined; stat2: string | undefined }[];
      }[];
      breedingRace: string[];
      categorie: string;
      character: string;
      image: File | null;
      name: string;
      physique: string;
      playable: boolean;
      type: string;
    },
    [
      {
        checked?: boolean;
        index?: number;
        type: string;
        value: string;
        file?: File;
      }
    ]
  >(
    (prevState, action) => {
      switch (action.type) {
        case "removeRace":
          return {
            ...prevState,
            breedingRace: prevState.breedingRace?.filter(
              (race) => race !== action.value
            ),
          };
        case "addRace":
          return {
            ...prevState,
            breedingRace: [...prevState.breedingRace, action.value],
          };
        case "categorie":
        case "character":
        case "name":
        case "physique":
          return {
            ...prevState,
            [action.type]: action.value,
          };
        case "image":
          return {
            ...prevState,
            image: action.file || null,
          };
        case "removeImage":
          return {
            ...prevState,
            image: null,
          };
        case "playable":
          return {
            ...prevState,
            playable: !!action.checked,
          };
        case "type":
          return {
            ...prevState,
            type: action.value,
            breedingRace:
              action.value === prevState.type ? prevState.breedingRace : [],
          };
        case "bloodType":
          const bloodTypes = prevState.bloodType;
          bloodTypes[action.index!].name = action.value;

          return {
            ...prevState,
            bloodType: bloodTypes,
          };
        case "bloodType+":
          setActiveBloodType(prevState.bloodType.length);
          return {
            ...prevState,
            bloodType: [
              ...prevState.bloodType,
              {
                name: "",
                max: "",
                min: "",
                stats: [{ stat1: undefined, stat2: undefined }],
              },
            ],
          };
        case "bloodType-":
          setActiveBloodType(
            activeBloodType < action.index!
              ? activeBloodType
              : activeBloodType - 1
          );

          return {
            ...prevState,
            bloodType: [
              ...prevState.bloodType.filter(
                (_, index) => index !== action.index
              ),
            ],
          };
        case "min":
        case "max":
          const currentState = { ...prevState };
          currentState.bloodType[activeBloodType][action.type] = action.value;

          return currentState;
        case "stat1":
        case "stat2":
          const currentState2 = { ...prevState };
          currentState2.bloodType[activeBloodType].stats[action.index!][
            action.type
          ] = action.value;
          return currentState2;
        case "removeStat":
          return {
            ...prevState,
            bloodType: prevState.bloodType.map((bloodType, index) =>
              index === activeBloodType
                ? {
                    ...bloodType,
                    stats: bloodType.stats.filter(
                      (_, statsIndex) => statsIndex !== action.index
                    ),
                  }
                : bloodType
            ),
          };
        case "addStat":
          return {
            ...prevState,
            bloodType: prevState.bloodType.map((bloodType, index) =>
              index === activeBloodType
                ? {
                    ...bloodType,
                    stats: [
                      ...bloodType.stats,
                      { stat1: undefined, stat2: undefined },
                    ],
                  }
                : bloodType
            ),
          };
        default:
          return {
            ...prevState,
          };
      }
    },
    {
      bloodType: [
        {
          name: "default",
          max: "",
          min: "",
          stats: [{ stat1: undefined, stat2: undefined }],
        },
      ],
      breedingRace: [],
      categorie: "",
      character: "",
      image: null,
      name: "",
      physique: "",
      playable: true,
      type: "",
    }
  );

  const onValidate = async () => {
    if (
      form.bloodType.some((bloodType) =>
        bloodType.stats.some((stats) => !stats.stat1 || !stats.stat2)
      )
    ) {
      throw Error("some stats are undefined");
    }

    const result = await insertRace(form);

    if (result.errors) {
      console.log(result.message, result.errors);
    } else {
      redirect("/admin/races");
    }
  };

  useEffect(() => {
    // create the preview
    console.log(form);
    if (form.image) {
      const objectUrl = URL.createObjectURL(form.image);
      setPreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(undefined);
    }
  }, [form]);

  return (
    <>
      <InputContainer className="w-24" name={t("common.name")}>
        <input
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-content2/80"
          id="name"
          name="name"
          onChange={(e) => {
            dispatch({ type: "name", value: e.target.value });
          }}
          placeholder=""
          required
          type="text"
          value={form.name}
        />
      </InputContainer>
      <div className="flex justify-center gap-16 items-baseline">
        <InputContainer className="w-24" name={t("race.categorie")}>
          <input
            className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-content2/80"
            id="categorie"
            name="categorie"
            onChange={(e) =>
              dispatch({ type: "categorie", value: e.target.value })
            }
            placeholder=""
            required
            value={form.categorie}
          />
        </InputContainer>
        <div className="flex items-center justify-center h-12">
          <label className="w-24">{t("race.playable")}&nbsp;:</label>
          <input
            type="checkbox"
            onChange={(e) =>
              dispatch({
                type: "playable",
                value: "",
                checked: e.target.checked,
              })
            }
            name="playable"
            size={20}
            className="border-1 border-primary text-primary w-6 h-4 bg-content2/80"
            checked={form.playable}
          />
        </div>
      </div>
      <div className="flex">
        <div className="w-[50%] m-8">
          <InputContainer
            className="text-center w-full text-lg"
            column
            full
            large
            name={t("race.appearance")}
          >
            <textarea
              className="peer block w-full rounded-md border p-2 text-sm outline-2 border-content2 bg-content2/80 mb-4"
              id="appearance"
              name="appearance"
              onChange={(e) =>
                dispatch({ type: "physique", value: e.target.value })
              }
              placeholder=""
              rows={5}
              required
              value={form.physique}
            />
          </InputContainer>
          <InputContainer
            column
            className="text-center w-full"
            large
            full
            name={t("race.character")}
          >
            <textarea
              className="peer block w-full rounded-md border p-2 text-sm outline-2 border-content2 bg-content2/80"
              id="character"
              name="character"
              onChange={(e) =>
                dispatch({ type: "character", value: e.target.value })
              }
              placeholder=""
              rows={5}
              required
              value={form.character}
            />
          </InputContainer>
          <InputContainer
            column
            className="text-center w-full"
            large
            full
            name={t("common.image")}
          >
            <div className="w-[50%] m-auto relative min-h-[150px] border-1 border-primary rounded-2xl overflow-hidden">
              <label htmlFor="file">
                <div className="group absolute w-full h-full flex justify-center items-center hover:cursor-pointer hover:bg-content2/50">
                  <div
                    className={clsx(
                      "right-[50%] left-[50%] bg-content2/80 border-2 border-primary rounded-xl px-4 py-1 group-hover:bg-primary/80",
                      preview ? "opacity-50 group-hover:opacity-100" : ""
                    )}
                  >
                    {preview ? "Changer d'image" : "Choisir une image"}
                  </div>
                </div>
                {preview && (
                  <Image
                    className="w-full"
                    src={preview}
                    alt="Image représentant le personnage"
                    width={0}
                    height={0}
                  />
                )}
              </label>
              <input
                accept="image/png, image/jpeg"
                className="hidden rounded-md border p-2 text-sm outline-2 border-content2 bg-content2/80"
                id="file"
                name="file"
                onChange={(e) => {
                  if (!e.target.files || e.target.files.length === 0) {
                    dispatch({ type: "removeImage", value: "" });
                    return;
                  }
                  // I've kept this example simple by using the first image instead of multiple
                  dispatch({
                    type: "image",
                    value: "",
                    file: e.target.files[0],
                  });
                }}
                placeholder=""
                required
                type="file"
              />
            </div>
          </InputContainer>
        </div>
        <div className="w-[50%]">
          <InputContainer name={t("race.type")}>
            <select
              className="peer block w-38 rounded-md border p-2 text-sm outline-2 border-content2 bg-content2/80"
              onChange={(e) =>
                dispatch({ type: "type", value: e.target.value })
              }
              value={form.type}
            >
              <option value={undefined} className="hidden">
                {t("race.type_placeholder")}
              </option>
              {raceTypeEnum.enumValues.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </InputContainer>
          {form.type === "Prime de sang" && (
            <>
              <div className="text-lg text-center mt-2">
                {t("race.breading_race")}
              </div>
              <div className="flex wrap justify-evenly">
                {breedingRaces.map((race) => (
                  <div className="w-40" key={race}>
                    <input
                      id={race}
                      type="checkbox"
                      onChange={(e) =>
                        e.target.checked
                          ? dispatch({ type: "removeRace", value: race })
                          : dispatch({ type: "addRace", value: race })
                      }
                      name={race}
                      size={20}
                      className="border-1 border-primary text-primary w-3 h-3 bg-content2/80 mr-2"
                    />
                    <label>{race}</label>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="h-5 w-full flex h-8 mt-6 mb-2">
            {form.bloodType.map((bloodType, index) => (
              <button
                key={index}
                className={clsx(
                  "flex items-center border-1 border-primary text-primary grow h-8 bg-content2/80 first-of-type:rounded-s-xl ",
                  activeBloodType === index
                    ? "bg-primary/80 text-primary-foreground"
                    : ""
                )}
                onClick={() => {
                  if (index !== activeBloodType) {
                    setActiveBloodType(index);
                  }
                }}
              >
                <div className="grow">
                  <input
                    className="w-32 bg-transparent text-center"
                    id={`${index}`}
                    name={`${index}`}
                    onChange={(e) =>
                      dispatch({
                        type: "bloodType",
                        index,
                        value: e.target.value,
                      })
                    }
                    placeholder=""
                    required
                    value={bloodType.name}
                  />
                </div>
                {form.bloodType.length > 1 && (
                  <div
                    className="mr-2 text-xl font-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({ type: "bloodType-", index, value: "" });
                    }}
                  >
                    x
                  </div>
                )}
              </button>
            ))}
            <button
              className="border-1 border-primary text-primary w-8 h-8 bg-content2/80 rounded-e-xl text-xl font-bold"
              onClick={() => dispatch({ type: "bloodType+", value: "" })}
            >
              +
            </button>
          </div>
          {form.bloodType.length > 1 && (
            <>
              <div className="flex justify-center">
                {t("race.blood_percentage")}&nbsp;:
              </div>
              <div className="flex justify-center mb-4 gap-16">
                <InputContainer name={t("common.min")}>
                  <input
                    className="peer block w-12 rounded-md border p-2 text-sm outline-2 border-content2 bg-content2/80"
                    id="min"
                    name="min"
                    onChange={(e) =>
                      dispatch({ type: "min", value: e.target.value })
                    }
                    placeholder=""
                    required
                    type="number"
                    value={form.bloodType[activeBloodType]?.min}
                  />
                </InputContainer>
                <InputContainer name={t("common.max")}>
                  <input
                    className="peer block w-12 rounded-md border p-2 text-sm outline-2 border-content2 bg-content2/80"
                    id="max"
                    name="max"
                    onChange={(e) =>
                      dispatch({ type: "max", value: e.target.value })
                    }
                    placeholder=""
                    required
                    type="number"
                    value={form.bloodType[activeBloodType]?.max}
                  />
                </InputContainer>
              </div>
            </>
          )}
          <div className="flex justify-center">{t("common.stats")}&nbsp;:</div>

          {form.bloodType[activeBloodType]?.stats.map((stats, index) => (
            <div
              key={`${activeBloodType}-${index}`}
              className="group flex justify-evenly items-center m-2"
            >
              <div></div>
              <select
                className="peer block w-36 rounded-md border p-2 text-sm outline-2 border-content2 bg-content2/80"
                onChange={(e) =>
                  dispatch({ type: "stat1", index, value: e.target.value })
                }
                value={stats.stat1}
              >
                <option value={undefined} className="hidden">
                  {t("race.stat1")}
                </option>
                {statEnum.enumValues.map((type) => (
                  <option key={type} value={type}>
                    {t(`stat.${type}`)}
                  </option>
                ))}
              </select>
              {t("common.capital_and")}
              <select
                className="block w-36 rounded-md border p-2 text-sm outline-2 border-content2 bg-content2/80"
                onChange={(e) => {
                  dispatch({ type: "stat2", index, value: e.target.value });
                }}
                value={stats.stat2}
              >
                <option value={undefined} className="hidden">
                  {t("race.stat2")}
                </option>
                {statEnum.enumValues.map((type) => (
                  <option key={type} value={type}>
                    {t(`stat.${type}`)}
                  </option>
                ))}
              </select>
              <button
                className="invisible group-hover:visible text-2xl font-bold text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: "removeStat", index, value: "" });
                }}
              >
                x
              </button>
            </div>
          ))}
          <div className="flex justify-center mr-4">
            <button
              className="w-8 text-2xl font-bold  rounded-[50%] bg-content2/80 hover:bg-primary/80"
              onClick={() => dispatch({ type: "addStat", value: "" })}
            >
              +
            </button>
          </div>
        </div>
        <BottomValidationButtons
          cancelRef="/admin/races"
          onValidate={onValidate}
        />
      </div>
    </>
  );
};

export default RaceCreationForm;
