import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          colors: {
            // light theme colors
            primary: {
              DEFAULT: "#9333ea",
              foreground: "#ffffff",
            },
            background: "#e2e8f0",
            foreground: "#020617",
            content1: "#f1f5f9",
            content2: "#E2EBF3",
            content3: "#E2EBF3",
          },
        },
        dark: {
          colors: {
            // dark theme colors
            primary: {
              DEFAULT: "#9333ea",
              foreground: "#ffffff",
            },
            background: "#020617",
            foreground: "#cbd5e1",
            content1: "#0f172a",
            content2: "#091121",
          },
        },
      },
    }),
  ],
};
export default config;
