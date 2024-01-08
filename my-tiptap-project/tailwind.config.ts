import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        // Custom font sizes for headings
        h1: "2.25rem", // equivalent to 36px
        h2: "1.875rem", // equivalent to 30px
        h3: "1.5rem", // equivalent to 24px
        // ... add h4, h5, h6 as needed
      },
      fontWeight: {
        // Custom font weights for headings
        heading: "700", // you can use 'bold' here as well
      },
    },
  },
  plugins: [],
};
export default config;
