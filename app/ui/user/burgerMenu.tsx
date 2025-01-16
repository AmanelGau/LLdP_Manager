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
} from "@heroicons/react/24/outline";
import { Key } from "react";
import { useRouter } from "next/navigation";
import { signout } from "@/app/lib/actions/authActions";

const burgerMenu = () => {
  const router = useRouter();

  const handleAction = (key: Key) => {
    switch (key) {
      case "logout":
        signout();
        break;
      case "params":
        router.push("/params");
        break;
    }
  };

  const iconClasses = "max-h-[20px] text-xl pointer-events-none flex-shrink-0";

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
        <DropdownItem
          key="params"
          startContent={<Cog8ToothIcon className={iconClasses} />}
        >
          Paramètres
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
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default burgerMenu;
