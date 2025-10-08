import {
  CharacterActions,
  RaceActions,
  SkillActions,
} from "@/app/[locale]/lib/actions";
import CharacterModificationForm from "@/app/[locale]/ui/form/characterModificationForm";
import { getI18n } from "@/app/local/server";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  const t = await getI18n();
  const [characterData] = await CharacterActions.getCharacter(
    session?.user?.email!
  );
  const skills = await SkillActions.getSkills(characterData.character.id);
  const races = await RaceActions.getRaces();
  const charRace = {
    primaryRace: characterData.primaryRace,
    raceName: characterData.raceName,
    race2: characterData.race2
      ? {
          id: characterData.race2.id,
          name: characterData.race2.name,
        }
      : undefined,
    race3: characterData.race3
      ? {
          id: characterData.race3.id,
          name: characterData.race3.name,
        }
      : undefined,
  };
  const primeBlood = await RaceActions.getPrimeBlood();

  return (
    <main>
      <h2 className="text-center text-xl">{t("character.modify")}</h2>
      <CharacterModificationForm
        charRace={charRace}
        defaultCharacter={characterData.character}
        defaultRelations={characterData.relations}
        defaultSkills={skills}
        defaultStats={characterData.stats}
        primeBlood={primeBlood}
        races={races}
      />
    </main>
  );
};

export default page;
