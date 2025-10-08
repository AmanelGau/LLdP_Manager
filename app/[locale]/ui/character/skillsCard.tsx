"use client";

import { useState } from "react";
import TabCard from "../tabCard";
import Table from "../table";
import {
  characterSkillLinkTable,
  skillTable,
  statEnum,
  statsTable,
} from "@/app/db/schema";
import { useI18n } from "@/app/local/client";

interface Props {
  stats: typeof statsTable.$inferSelect;
  skills: {
    skill: typeof skillTable.$inferSelect;
    characterSkillLink: typeof characterSkillLinkTable.$inferSelect | null;
  }[];
}

const SkillsCard = ({ stats, skills }: Props) => {
  const t = useI18n();
  const [activeTab, setActiveTab] = useState<string>("intelligence");
  const [searchString, setSearchString] = useState<string>("");
  const skillHeaders = {
    name: t("character.header_name"),
    base: t("character.header_base"),
    points: t("character.header_points"),
    total: t("character.header_total"),
  };

  const skillsData = skills.map((skill) => {
    let baseStat = 0;
    switch (skill.skill.stat) {
      case "intelligence":
      case "will":
      case "power":
      case "force":
      case "constitution":
      case "agility":
      case "knowHow":
      case "social":
      case "sociable":
        baseStat = stats[skill.skill.stat] * 2;
        break;
    }
    return {
      name: skill.skill.name,
      base: baseStat,
      points: skill.characterSkillLink?.points || null,
      total: skill.characterSkillLink?.innate
        ? 100
        : (skill.characterSkillLink?.points || 0) + baseStat,
      stat: skill.skill.stat,
    };
  });

  const TabNode = ({ label, points }: { label: string; points: number }) => (
    <div key={label} className="w-full text-center">
      <div>{label}</div>
      <div>
        {points} ({points * 5}%)
      </div>
    </div>
  );

  const tabs = statEnum.enumValues.map((stat) => ({
    name: stat,
    label: t(`stat.${stat}`),
    points: stats[stat],
  }));

  return (
    <TabCard
      tabs={tabs}
      createTabContent={({
        label,
        points,
      }: {
        label: string;
        points: number;
      }) => <TabNode label={label} points={points} />}
      activeTab={searchString !== "" ? null : activeTab}
      setActiveTab={(newActiveTab) => {
        setActiveTab(newActiveTab);
        setSearchString("");
      }}
    >
      <input
        onChange={(e) => setSearchString(e.target.value)}
        className="peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 border-content2 bg-background text-foreground"
        type="text"
        placeholder={t("character.research_placeholder")}
      />
      <Table
        data={skillsData.filter((skill) =>
          searchString !== ""
            ? skill.name
                .toLocaleLowerCase()
                .includes(searchString.toLocaleLowerCase())
            : skill.stat === activeTab
        )}
        headers={skillHeaders}
        rowClassName={(skill: any) => {
          return (
            (skill.total === 70 || skill.total === 80
              ? "via-primary"
              : skill.total > skill.base
              ? "via-yellow-300"
              : "") +
            " bg-gradient-to-r from-[1%] from-content2 to-content2 to-[99%]"
          );
        }}
      />
    </TabCard>
  );
};

export default SkillsCard;
