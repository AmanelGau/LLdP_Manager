import { characterTable, raceBonusTable } from "@/app/db/schema";
import Card from "../../card";
import RaceModal from "./raceModal";

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
  const InputContainer = ({
    name,
    children,
  }: {
    name: string;
    children: any;
  }) => (
    <div className="flex items-baseline justify-center">
      <label
        className="mb-3 mt-5 block text-xs font-medium w-32"
        htmlFor="email"
      >
        {name} : &nbsp;
      </label>
      <div className="relative">{children}</div>
    </div>
  );

  return (
    <Card className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-2">
      <InputContainer name="Nom *">
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
      <InputContainer name="Prénom *">
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
      <InputContainer name="Age *">
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
      <InputContainer name="Sexe *">
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
      <InputContainer name="Race *">
        {/* <div className="w-32 overflow-visible">
          <div className="w-max">
            {charRace?.raceName +
              (charRace.race2
                ? ` / ${charRace.race2?.name}` +
                  (charRace.race3 ? ` / ${charRace.race3?.name}` : "")
                : "")}
          </div>
        </div> */}
        <RaceModal
          charRace={charRace}
          primeBlood={primeBlood}
          races={races}
          setForm={setForm}
        />
      </InputContainer>
      <InputContainer name="Magie">
        <input
          defaultValue={character?.magic || ""}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="magic"
          name="magic"
          onBlur={(e) => setForm({ type: "magic", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name="Groupe de métier">
        <input
          defaultValue={character?.jobGroup || ""}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="jobGroup"
          name="jobGroup"
          onBlur={(e) => setForm({ type: "jobGroup", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name="Qualité">
        <input
          defaultValue={character?.quality || ""}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="quality"
          name="quality"
          onBlur={(e) => setForm({ type: "quality", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name="Défaut">
        <input
          defaultValue={character?.fault || ""}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="fault"
          name="fault"
          onBlur={(e) => setForm({ type: "fault", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name="Métier">
        <input
          defaultValue={character?.job || ""}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="job"
          name="job"
          onBlur={(e) => setForm({ type: "job", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name="Religion">
        <input
          defaultValue={character?.religion || ""}
          className="peer block w-32 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
          id="religion"
          name="religion"
          onBlur={(e) => setForm({ type: "religion", value: e.target.value })}
          placeholder=""
        />
      </InputContainer>
      <InputContainer name="Nationnalité">
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
    </Card>
  );
};

export default IdentityCardForm;
