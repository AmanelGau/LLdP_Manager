import { getBreedingRaces } from "@/app/[locale]/lib/actions/raceActions";
import RaceCreationForm from "@/app/[locale]/ui/admin/raceCreationForm";
import { getI18n } from "@/app/local/server";
import React from "react";

const page = async () => {
  const breedingRaces = await getBreedingRaces();
  const t = await getI18n();

  return (
    <main className="m-2">
      <div className="w-full text-center text-2xl">{t("race.create")}</div>
      <RaceCreationForm breedingRaces={breedingRaces} />
    </main>
  );
};

export default page;
