import { getI18n } from "@/app/local/server";
import React from "react";

const page = async () => {
  const t = await getI18n();

  return (
    <main>
      <div className="text-center text-2xl">{t("pet")}</div>
    </main>
  );
};

export default page;
