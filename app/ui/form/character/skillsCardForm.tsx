"use client";

import {
  CharacterSkillLinkTable,
  SkillTable,
  statsTable,
} from "@/app/db/schema";
import TabCard from "../../tabCard";
import { useEffect, useState } from "react";
import Table from "../../table";
import SkillInput from "./skillInput";

interface Props {
  setForm: (action: { key?: string; type: string; value: string }) => void;
  skills: {
    [key: string]: string;
  };
  skillsList: {
    characterSkillLink: typeof CharacterSkillLinkTable.$inferSelect | null;
    skill: typeof SkillTable.$inferSelect;
  }[];
  stats: {
    intelligence: string;
    force: string;
    knowHow: string;
    will: string;
    constitution: string;
    social: string;
    power: string;
    agility: string;
    sociable: string;
  };
}

const SkillsCardForm = ({ setForm, skills, skillsList, stats }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("intelligence");
  const [skillsData, setSkillsData] = useState<any[]>([]);

  const tabs = [
    { name: "intelligence", label: "Intelligence" },
    { name: "will", label: "Volonté" },
    { name: "power", label: "Pouvoir" },
    { name: "force", label: "Force" },
    { name: "constitution", label: "Constitution" },
    { name: "agility", label: "Agilité" },
    { name: "knowHow", label: "Savoir-faire" },
    { name: "social", label: "Social" },
    { name: "sociable", label: "Sociable" },
  ];

  const skillHeaders = {
    name: "Nom",
    base: "Base",
    points: "Points répartis",
    total: "Totale",
  };

  const TabNode = ({ label }: { label: string }) => (
    <div key={label} className="w-full text-center">
      <div>{label}</div>
    </div>
  );

  const getToDispatchPointsPoint = () => {
    const dispatchedPoints = skillsList
      .filter((el) => el.skill.stat == activeTab)
      .reduce((points, el) => points + (Number(skills[el.skill.name]) || 0), 0);
    switch (activeTab) {
      case "intelligence":
        return 120 + (Number(stats.intelligence) - 10) * 10 - dispatchedPoints;
      case "will":
        return 110 + (Number(stats.will) - 10) * 10 - dispatchedPoints;
      case "power":
        return Number(stats.power) * 5 - dispatchedPoints;
      case "sociable":
        return Number(stats.sociable) * 5 - dispatchedPoints;
      case "force":
        return 100 + (Number(stats.force) - 10) * 10 - dispatchedPoints;
      case "constitution":
        return 100 + (Number(stats.constitution) - 10) * 10 - dispatchedPoints;
      case "agility":
        return 140 + (Number(stats.agility) - 10) * 10 - dispatchedPoints;
      case "knowHow":
        return 90 + (Number(stats.knowHow) - 10) * 10 - dispatchedPoints;
      case "social":
        return 70 + (Number(stats.social) - 10) * 10 - dispatchedPoints;
    }
  };

  useEffect(() => {
    console.log(skills);
    setSkillsData(
      skillsList.map((skill) => {
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
            baseStat = Number(stats[skill.skill.stat]) * 2;
            break;
        }
        return {
          name: skill.skill.name,
          base: baseStat,
          points: (
            <SkillInput
              skill={skill}
              setForm={setForm}
              value={skills[skill.skill.name]}
            />
          ),
          total: skill.characterSkillLink?.innate
            ? 100
            : (Number(skills[skill.skill.name]) || 0) + baseStat,
          stat: skill.skill.stat,
        };
      })
    );
  }, [skills]);

  return (
    <TabCard
      tabs={tabs}
      createTabContent={({ label }: { label: string }) => (
        <TabNode label={label} />
      )}
      activeTab={activeTab}
      setActiveTab={(newActiveTab) => {
        setActiveTab(newActiveTab);
      }}
    >
      Points à répartir : {getToDispatchPointsPoint()}
      {activeTab == "intelligence" && (
        <Table
          data={skillsData.filter((skill) => skill.stat === "intelligence")}
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
      )}
      {activeTab == "will" && (
        <Table
          data={skillsData.filter((skill) => skill.stat === "will")}
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
      )}
      {activeTab == "power" && (
        <Table
          data={skillsData.filter((skill) => skill.stat === "power")}
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
      )}
      {activeTab == "force" && (
        <Table
          data={skillsData.filter((skill) => skill.stat === "force")}
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
      )}
      {activeTab == "constitution" && (
        <Table
          data={skillsData.filter((skill) => skill.stat === "constitution")}
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
      )}
      {activeTab == "agility" && (
        <Table
          data={skillsData.filter((skill) => skill.stat === "agility")}
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
      )}
      {activeTab == "knowHow" && (
        <Table
          data={skillsData.filter((skill) => skill.stat === "knowHow")}
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
      )}
      {activeTab == "social" && (
        <Table
          data={skillsData.filter((skill) => skill.stat === "social")}
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
      )}
      {activeTab == "sociable" && (
        <Table
          data={skillsData.filter((skill) => skill.stat === "sociable")}
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
      )}
    </TabCard>
  );
};

export default SkillsCardForm;
