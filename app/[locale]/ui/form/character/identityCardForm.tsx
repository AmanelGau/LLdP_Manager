"use client";

import { characterTable, raceBonusTable } from "@/app/db/schema";
import Card from "../../card";
import RaceModal from "./raceModal";
import { useI18n } from "@/app/local/client";

interface Props {
  character: typeof characterTable.$inferInsert;
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

const IdentityCardForm = ({
  character,
  charRace,
  primeBlood,
  races,
  setForm,
}: Props) => {
  const t = useI18n();
  const InputContainer = ({
    name,
    children,
  }: {
    name: string;
    children: any;
  }) => (
    <div className="flex items-baseline justify-center">
      <label className="mb-3 mt-5 block text-xs font-medium w-32">
        {name} : &nbsp;
      </label>
      <div className="relative">{children}</div>
    </div>
  );

  return (
    <Card className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-2">
      <InputContainer name={`${t("common.name")} *`}>
        <input
          defaultValue={character?.lastName}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="lastname"
          name="lastname"
          onBlur={(e) => setForm({ type: "lastName", value: e.target.value })}
          placeholder=""
          required
        />
      </InputContainer>
      <InputContainer name={`${t("common.first_name")} *`}>
        <input
          defaultValue={character?.forename}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="forename"
          name="forename"
          onBlur={(e) => setForm({ type: "forename", value: e.target.value })}
          placeholder=""
          required
        />
      </InputContainer>
      <InputContainer name={`${t("character.age")} *`}>
        <input
          defaultValue={character?.age}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="age"
          type="number"
          name="age"
          onBlur={(e) => setForm({ type: "age", value: e.target.value })}
          placeholder=""
          required
        />
      </InputContainer>
      <InputContainer name={`${t("character.sex")} *`}>
        <input
          defaultValue={character?.sex}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="sex"
          name="sex"
          onBlur={(e) => setForm({ type: "sex", value: e.target.value })}
          placeholder=""
          required
        />
      </InputContainer>
      <InputContainer name={`${t("race")} *`}>
        <RaceModal
          charRace={charRace}
          primeBlood={primeBlood}
          races={races}
          setForm={setForm}
        />
      </InputContainer>
      <InputContainer name={t("character.magic")}>
        <input
          defaultValue={character?.magic || ""}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="magic"
          name="magic"
          onBlur={(e) => setForm({ type: "magic", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name={t("character.jobGroup")}>
        <input
          defaultValue={character?.jobGroup || ""}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="jobGroup"
          name="jobGroup"
          onBlur={(e) => setForm({ type: "jobGroup", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name={t("character.quality")}>
        <input
          defaultValue={character?.quality || ""}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="quality"
          name="quality"
          onBlur={(e) => setForm({ type: "quality", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name={t("character.fault")}>
        <input
          defaultValue={character?.fault || ""}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="fault"
          name="fault"
          onBlur={(e) => setForm({ type: "fault", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name={t("character.job")}>
        <input
          defaultValue={character?.job || ""}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="job"
          name="job"
          onBlur={(e) => setForm({ type: "job", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name={t("character.religion")}>
        <input
          defaultValue={character?.religion || ""}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="religion"
          name="religion"
          onBlur={(e) => setForm({ type: "religion", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name={t("character.nationality")}>
        <input
          defaultValue={character?.nationality || ""}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="nationality"
          name="nationality"
          onBlur={(e) =>
            setForm({ type: "nationality", value: e.target.value })
          }
          placeholder=""
        />
      </InputContainer>
      <InputContainer name={`${t("character.level")} *`}>
        <input
          defaultValue={character?.level}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="level"
          type="number"
          name="level"
          onBlur={(e) => setForm({ type: "level", value: e.target.value })}
          placeholder=""
          required
        />
      </InputContainer>
    </Card>
  );
};

export default IdentityCardForm;
