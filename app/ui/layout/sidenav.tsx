"use client";

import GuildTreeSvg from "../svg/guildTreeSvg";
import ScalesSvg from "../svg/scalesSvg";
import CharacterSvg from "../svg/characterSvg";
import PetSvg from "../svg/petSvg";
import ChestSvg from "../svg/chestSvg";
import SidenavLink from "./sidenavLink";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import RelationSvg from "../svg/relationSvg";
import SpellAndTechniqueSvg from "../svg/spellAndTechniqueSvg";

const sidenav = () => {
  const pathname = usePathname();

  return (
    <div className="shadow-md z-10 flex h-full flex-col px-4 py-4 w-[72px] text-[0px] transition truncate ease-in-out hover:w-[272px] hover:text-xl transition-[width,font-size]">
      <SidenavLink
        active={pathname.includes("/character")}
        icon={
          <CharacterSvg
            className={clsx("min-w-10 max-w-10", {
              fill: pathname.includes("/character") ? "primary" : "foreground",
            })}
          />
        }
        label="Personnage"
        link="/character"
      />
      <SidenavLink
        active={pathname.includes("/inventory")}
        icon={
          <ChestSvg
            className={clsx("min-w-10 max-w-10", {
              fill: pathname.includes("/inventory") ? "primary" : "foreground",
            })}
          />
        }
        label="Inventaire"
        link="/inventory"
      />
      <SidenavLink
        active={pathname.includes("/spellsAndTechniques")}
        icon={
          <SpellAndTechniqueSvg
            className={clsx("min-w-10 max-w-10", {
              fill: pathname.includes("/spellsAndTechniques")
                ? "primary"
                : "foreground",
            })}
          />
        }
        label="Sorts et Techniques"
        link="/spellsAndTechniques"
      />
      <SidenavLink
        active={pathname.includes("/pet")}
        icon={
          <PetSvg
            className={clsx("min-w-10 max-w-10", {
              fill: pathname.includes("/pet") ? "primary" : "foreground",
            })}
          />
        }
        label="Familier & monture"
        link="/pet"
      />
      <SidenavLink
        active={pathname.includes("/guild")}
        icon={
          <GuildTreeSvg
            className={clsx("min-w-10 max-w-10", {
              fill: pathname.includes("/guild") ? "primary" : "foreground",
            })}
          />
        }
        label="Guilde"
        link="/guild"
      />
      <SidenavLink
        active={pathname.includes("/market")}
        icon={
          <ScalesSvg
            className={clsx("min-w-10 max-w-10", {
              fill: pathname.includes("/market") ? "primary" : "foreground",
            })}
          />
        }
        label="Marché"
        link="/market"
      />
      <SidenavLink
        active={pathname.includes("/relations")}
        icon={
          <RelationSvg
            className={clsx("min-w-10 max-w-10", {
              fill: pathname.includes("/relations") ? "primary" : "foreground",
            })}
          />
        }
        label="Relations"
        link="/relations"
      />
    </div>
  );
};

export default sidenav;
