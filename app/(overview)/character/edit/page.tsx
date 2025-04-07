import { CharacterActions, SkillActions } from "@/app/lib/actions";
import CharacterModificationForm from "@/app/ui/form/characterModificationForm";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  const characterData = (
    await CharacterActions.getCharacter(session?.user?.email!)
  )[0];
  const skills = await SkillActions.getSkills(characterData.character.id);

  return (
    <main>
      <h2 className="text-center text-xl">Modification du Personnage</h2>
      <CharacterModificationForm
        defaultCharacter={characterData.character}
        defaultRelations={characterData.relations}
        defaultSkills={skills}
        defaultStats={characterData.stats}
      />
    </main>
  );
};

export default page;
