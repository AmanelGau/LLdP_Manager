import { SkillActions } from "@/app/lib/actions";
import CharacterCreationForm from "@/app/ui/form/characterCreationForm";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  const skills = await SkillActions.getSkills(null);

  return (
    <main>
      <h2 className="text-center text-xl">Modification du Personnage</h2>
      <CharacterCreationForm
        defaultSkills={skills}
        userEmail={session!.user!.email!}
      />
    </main>
  );
};

export default page;
