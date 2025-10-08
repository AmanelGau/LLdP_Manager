import { CharacterActions, SkillActions } from "@/app/[locale]/lib/actions";
import BottomEditButton from "@/app/[locale]/ui/bottomEditButton";
import GlobalInfo from "@/app/[locale]/ui/character/identityCard";
import NoteCard from "@/app/[locale]/ui/character/noteCard";
import RelationCard from "@/app/[locale]/ui/character/relationCard";
import SkillsCard from "@/app/[locale]/ui/character/skillsCard";
import { getI18n } from "@/app/local/server";
import { auth } from "@/auth";
import Link from "next/link";

const page = async () => {
  const session = await auth();
  const t = await getI18n();
  const characterData = await CharacterActions.getCharacter(
    session?.user?.email!
  );
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
          <div>{t("character.no_character")}</div>
          <Link
            href="/character/create"
            className="px-3 py-1 rounded-md bg-primary text-content1"
          >
            {t("character.create_link")}
          </Link>
        </div>
      )}
    </main>
  );
};

export default page;
