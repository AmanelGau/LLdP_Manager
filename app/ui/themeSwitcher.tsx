"use client";

import { Switch } from "@nextui-org/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const changeTheme = (isLightSelected: boolean) => {
    if (isLightSelected) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      color="success"
      defaultSelected
      endContent={<MoonIcon />}
      isSelected={theme === "light"}
      onValueChange={changeTheme}
      size="lg"
      startContent={<SunIcon />}
    >
      Dark mode
    </Switch>
  );
}
