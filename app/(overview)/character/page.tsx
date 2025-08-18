import { CharacterActions, SkillActions } from "@/app/lib/actions";
import BottomEditButton from "@/app/ui/bottomEditButton";
import GlobalInfo from "@/app/ui/character/identityCard";
import NoteCard from "@/app/ui/character/noteCard";
import RelationCard from "@/app/ui/character/relationCard";
import SkillsCard from "@/app/ui/character/skillsCard";
import { auth } from "@/auth";
import Link from "next/link";

const page = async () => {
  const session = await auth();
  const characterData = await CharacterActions.getCharacter(
    session?.user?.email!
  );
  console.log(characterData);
  const skills =
    characterData.length >= 1
      ? await SkillActions.getSkills(characterData[0].character.id)
      : null;

  return (
    <main className="h-full">
      {characterData.length >= 1 ? (
        <>
          <GlobalInfo
            characterData={characterData[0].character}
            stats={characterData[0].stats}
            race={
              characterData[0].raceName +
              (characterData[0].race2
                ? " / " +
                  characterData[0].race2?.name +
                  (characterData[0].race3
                    ? " / " + characterData[0].race3?.name
                    : "")
                : "")
            }
          />
          <RelationCard relations={characterData[0].relations} />
          <SkillsCard stats={characterData[0].stats} skills={skills!} />
          <NoteCard imageUrl={characterData[0].character.image} />
          <BottomEditButton link="/character/edit" />
        </>
      ) : (
        <div className="h-full flex items-center flex-col pt-[25%] gap-1">
          <div>Pas de personnage trouvé</div>
          <Link
            href="/character/create"
            className="px-3 py-1 rounded-md bg-primary text-content1"
          >
            Crée votre personnage
          </Link>
        </div>
      )}
    </main>
  );
};

export default page;
