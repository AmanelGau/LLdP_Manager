import { CharacterActions, SkillActions } from "@/app/lib/actions";
import BottomEditButton from "@/app/ui/bottomEditButton";
import GlobalInfo from "@/app/ui/character/identityCard";
import RelationCard from "@/app/ui/character/relationCard";
import SkillsCard from "@/app/ui/character/skillsCard";
import { auth } from "@/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  console.log("session", session);
  const characterData = (
    await CharacterActions.getCharacter(session?.user?.email!)
  )[0];

  const skills = await SkillActions.getSkills(characterData.character.id);

  return (
    <main>
      <GlobalInfo
        characterData={characterData.character}
        stats={characterData.stats}
      />
      <RelationCard relations={characterData.relations} />
      <SkillsCard stats={characterData.stats} skills={skills} />
      <BottomEditButton link="/character/edit" />
    </main>
  );
};

export default page;
