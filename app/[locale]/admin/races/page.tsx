import RacesTable from "@/app/[locale]/ui/admin/raceTable";
import { getI18n } from "@/app/local/server";
import Link from "next/link";
import React from "react";

const page = async () => {
  const t = await getI18n();

  return (
    <main className="m-2">
      <div className="w-full text-center text-2xl">{t("race.plural")}</div>
      <div className="m-4">
        <Link
          href="/admin/races/create"
          className="w-max flex h-10 items-center rounded-lg bg-purple-700 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          +&nbsp;{t("race.add")}
        </Link>
      </div>
      <RacesTable />
    </main>
  );
};

export default page;
