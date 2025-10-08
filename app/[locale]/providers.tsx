"use client";

import { NextUIProvider } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { I18nProviderClient } from "../local/client";
import { PropsWithChildren } from "react";

const NextThemesProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  {
    ssr: false,
  }
);

export const Providers = ({
  children,
  locale,
}: PropsWithChildren<{
  children: React.ReactNode;
  locale: string;
}>) => {
  return (
    <NextUIProvider>
      <I18nProviderClient locale={locale}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </NextThemesProvider>
      </I18nProviderClient>
    </NextUIProvider>
  );
};
