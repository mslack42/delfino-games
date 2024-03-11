import type { Config } from "tailwindcss";
import colours from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      blur: {
        xs: "2px",
        xxs: "1px",
      },
      gridTemplateColumns: {
        "game-cards-sm": "repeat(auto-fit, minmax(180px, 1fr))",
        "game-cards-md": "repeat(auto-fit, minmax(250px, 1fr))",
      },
    },
    colors: {
      ...colours,
      black: colours.black,
      blue: { ...colours.blue },
      teal: { ...colours.teal },
      white: colours.white,
      slate: { ...colours.slate },
      red: { ...colours.red },
      // Defining various key words, for site consistency in colours
      primary: {
        ...colours.teal,
      },
      card: colours.teal[200],
      cardScroller: colours.teal[100],
      tag: colours.sky[300],
      headbar: colours.teal[600],
      warning: colours.red[500],
    },
  },
};
export default config;
