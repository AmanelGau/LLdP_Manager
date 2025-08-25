import React from "react";

const page = () => {
  return (
    <main>
      <div className="text-center text-2xl">Inventaire</div>
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
