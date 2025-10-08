"use client";

import { characterSkillLinkTable, skillTable } from "@/app/db/schema";

interface Props {
  setForm: (action: { key?: string; type: string; value: string }) => void;
  skill: {
    characterSkillLink: typeof characterSkillLinkTable.$inferInsert | null;
    skill: typeof skillTable.$inferSelect;
  };
  value: string;
}

const SkillInput = ({ setForm, skill, value }: Props) => {
  return (
    <div className="w-full grid place-content-center">
      <input
        className="peer block w-10 rounded-md border p-2 text-sm outline-2 border-content2 bg-background text-foreground"
        defaultValue={value}
        id={skill.skill.name}
        onBlur={(e) =>
          setForm({
            type: "skill",
            key: skill.skill.name,
            value: e.target.value,
          })
        }
        type="number"
        name={skill.skill.name}
        placeholder=""
      />
    </div>
  );
};

export default SkillInput;
