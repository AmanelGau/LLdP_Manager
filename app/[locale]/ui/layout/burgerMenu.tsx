"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
} from "@nextui-org/react";
import {
  Bars3Icon,
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  UserGroupIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Key } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/[locale]/lib/actions/authActions";
import { useChangeLocale, useCurrentLocale, useI18n } from "@/app/local/client";
import FlagFrSvg from "../svg/flagFrSvg";
import FlagEnSvg from "../svg/flagEnSvg";

const BurgerMenu = ({
  isAdmin,
  adminPage,
}: {
  isAdmin: boolean;
  adminPage?: boolean;
}) => {
  const lang = useCurrentLocale();
  const router = useRouter();
  const t = useI18n();
  const changeLocal = useChangeLocale();

  const handleAction = (key: Key) => {
    switch (key) {
      case "adminMode":
        adminPage ? router.push("/") : router.push("/admin");
        break;
      case "lang":
        changeLocal(lang === "en" ? "fr" : "en");
        break;
      case "logout":
        logout();
        break;
      case "settings":
        router.push("/settings");
        break;
      case "changeCharacter":
        router.push("/changeCharacter");
        break;
    }
  };

  const iconClasses = "max-h-[20px] text-xl pointer-events-none shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer">
        <Bars3Icon className="w-8" />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown menu with icons"
        variant="bordered"
        onAction={(key) => {
          handleAction(key);
        }}
      >
        {isAdmin ? (
          <DropdownItem
            key="adminMode"
            startContent={<PencilSquareIcon className={iconClasses} />}
          >
            {adminPage ? "Mode Joueur" : "Mode Admin"}
          </DropdownItem>
        ) : (
          <></>
        )}
        <DropdownItem
          key="changeCharacter"
          startContent={<UserGroupIcon className={iconClasses} />}
        >
          {t("character.change_character")}
        </DropdownItem>
        <DropdownItem
          key="settings"
          startContent={<Cog8ToothIcon className={iconClasses} />}
        >
          {t("common.settings")}
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          startContent={
            <ArrowRightStartOnRectangleIcon
              className={cn(iconClasses, "text-danger")}
            />
          }
        >
          {t("common.logout")}
        </DropdownItem>
        <DropdownItem
          key="lang"
          startContent={
            lang === "en" ? (
              <FlagFrSvg className={iconClasses} />
            ) : (
              <FlagEnSvg className={iconClasses} />
            )
          }
        >
          {t(`common.lang_change_${lang}`)}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default BurgerMenu;
