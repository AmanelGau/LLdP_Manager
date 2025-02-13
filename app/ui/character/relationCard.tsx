import React from "react";
import Card from "../card";
import { RelationsType } from "@/app/lib/actions/characterActions";

interface Props {
  relations: RelationsType;
}

const RelationCard = ({ relations }: Props) => {
  return (
    <Card className="grid grid-flow-row grid-cols-1 md:grid-cols-2 text-center gap-2">
      <div>Proche : {relations.close}</div>
      <div>Opposé : {relations.opposite}</div>
      <div>Éloigné : {relations.distant}</div>
      <div>Ennemi : {relations.enemy}</div>
    </Card>
  );
};

export default RelationCard;
