import { getI18n } from "@/app/local/server";
import React from "react";

const page = async () => {
  const t = await getI18n();

  return (
    <main>
      <div className="text-center text-2xl">{t("inventory")}</div>
      <button className="block text-sm outline-2 text-foreground border-2 border-primary rounded-lg px-2 py-1 hover:bg-primary/80">
        + Ajouter un objet
      </button>
      <h4>Equipement</h4>
      <h4>Inventaire de base (5 Emplacement)</h4>
      <h4>Sac à dos (4 Emplacement)</h4>
    </main>
  );
};

export default page;
