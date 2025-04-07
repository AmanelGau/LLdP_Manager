import React from "react";
import Card from "../card";

interface Props {
  imageUrl: string | null;
}

const NoteCard = ({ imageUrl }: Props) => {
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4">
      <Card className="mt-0"></Card>
      <Card className="mt-0">
        {imageUrl && (
          <img
            className="w-full"
            src={`/upload/${imageUrl}`}
            alt="Image représentatnt le personnage"
          />
        )}
      </Card>
    </div>
  );
};

export default NoteCard;
