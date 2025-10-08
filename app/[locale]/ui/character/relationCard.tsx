import React from "react";
import Card from "../card";
import { relationsTable } from "@/app/db/schema";
import { getI18n } from "@/app/local/server";

interface Props {
  relations: typeof relationsTable.$inferSelect;
}

const RelationCard = async ({ relations }: Props) => {
  const t = await getI18n();

  return (
    <Card className="grid grid-flow-row grid-cols-1 md:grid-cols-2 text-center gap-2">
      <div>
        {t("character.relations_close")}&nbsp;:&nbsp;{relations.close}
      </div>
      <div>
        {t("character.relations_opposite")}&nbsp;:&nbsp;{relations.opposite}
      </div>
      <div>
        {t("character.relations_distant")}&nbsp;:&nbsp;{relations.distant}
      </div>
      <div>
        {t("character.relations_enemy")}&nbsp;:&nbsp;{relations.enemy}
      </div>
    </Card>
  );
};

export default RelationCard;
