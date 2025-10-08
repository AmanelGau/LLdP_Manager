import { RaceActions, SkillActions } from "@/app/[locale]/lib/actions";
import CharacterCreationForm from "@/app/[locale]/ui/form/characterCreationForm";
import { getI18n } from "@/app/local/server";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  const skills = await SkillActions.getSkills(null);
  const races = await RaceActions.getRaces();
  const primeBlood = await RaceActions.getPrimeBlood();
  const t = await getI18n();

  return (
    <main>
      <h2 className="text-center text-xl">{t("character.create")}</h2>
      <CharacterCreationForm
        defaultSkills={skills}
        primeBlood={primeBlood}
        races={races}
        userEmail={session!.user!.email!}
      />
    </main>
  );
};

export default page;
