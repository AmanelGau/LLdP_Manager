import { getRaces } from "@/app/[locale]/lib/actions/raceActions";
import RaceCard from "./raceCard";

const RacesTable = async () => {
  const races = await getRaces();
  return (
    <div className="flex justify-evenly flex-wrap gap-2 md:gap-4 lg:gap-8 2xl:gap-12">
      {races.map((race) => (
        <RaceCard
          image={race.race.image}
          key={race.race.id}
          name={race.race.name}
        />
      ))}
    </div>
  );
};

export default RacesTable;
