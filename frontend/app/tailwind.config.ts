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
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1C7ED6", // Custom primary color
          secondary: "#F03E3E", // Custom secondary color
          accent: "#51CF66", // Custom accent color
          neutral: "#2B2D42", // Custom neutral color
          "base-100": "#FFFFFF", // Background color
          info: "#1098AD",
          success: "#37B24D",
          warning: "#F59F00",
          error: "#E03131",
        },
      },
      "lofi", // You can still include other built-in themes
    ],
  },
};
export default config;
