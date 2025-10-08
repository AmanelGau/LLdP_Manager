"use client";

import { useI18n } from "@/app/local/client";
import CharacterSvg from "../svg/characterSvg";
import SidenavLink from "./sidenavLink";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const SidenavAdmin = () => {
  const t = useI18n();
  const pathname = usePathname();

  return (
    <div className="shadow-md z-10 flex h-full flex-col px-4 py-4 w-[72px] text-[0px] transition truncate ease-in-out hover:w-[272px] hover:text-xl transition-[width,font-size]">
      <SidenavLink
        active={pathname.includes("/admin/races")}
        icon={
          <CharacterSvg
            className={clsx("min-w-10 max-w-10", {
              fill: pathname.includes("/admin/races")
                ? "primary"
                : "foreground",
            })}
          />
        }
        label={t("race.plural")}
        link="/admin/races"
      />
    </div>
  );
};

export default SidenavAdmin;
