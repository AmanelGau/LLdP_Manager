import React from "react";
import Card from "../card";

interface Props {
  image: string | null;
  name: string;
}

const RaceCard = ({ image, name }: Props) => {
  return (
    <Card
      className={`w-[80%] md:w-[40%] md:hover:w-[55%] lg:w-[24%] lg:hover:w-[40%] xl:w-[19%] xl:hover:w-[33%] 2xl:w-[15%] 2xl:hover:w-[25%] h-80 transition ease-in-out duration-200 transition-[width]`}
    >
      <div
        style={
          image
            ? {
                backgroundImage: `url(/upload/${image})`,
              }
            : {}
        }
        className="w-full h-full bg-[length:auto_260px] bg-top bg-no-repeat flex justify-center items-end text-xl"
      >
        {name}
      </div>
    </Card>
  );
};

export default RaceCard;
