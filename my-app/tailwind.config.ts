import type { Config } from "tailwindcss";

// import { DarkModeConfig } from "tailwindcss/types/config";

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: "#FFC122",
        secondary: "#FAF8DA",
        secondary2: "#FCF29A",
        brownFont: "#7B3F00",
        darkFont: "#3c4043",
      },
    },
  },
  // theme: {
  //   extend: {
  //     fontFamily: {
  //       title: ["var(--font-title)", "system-ui", "sans-serif"],
  //       default: ["var(--font-default)", "system-ui", "sans-serif"],
  //     },
  //   },
  // },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // disable dark mode
  //https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
  darkMode: "class",

  // theme: {
  //   extend: {
  //     backgroundImage: {
  //       "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
  //       "gradient-conic":
  //         "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
  //     },
  //   },
  // },
  // plugins: [require("tailwindcss-animate")],
  plugins: [require("@tailwindcss/typography")],
};
export default config;
