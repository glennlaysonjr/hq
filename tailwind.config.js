/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./formkit.config.ts",
    "./theme.formkit.ts",
    "./app.vue",
  ],
  theme: {
    extend: {
      cursor: {
        fancy: "url(@/assets/media/cursor.svg), auto",
      },
      colors: {
        zinc: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#5a5a5a",
          600: "#484848",
          700: "#252525",
          800: "#181818",
          900: "#121212",
        },
        gpurple: "#5822f6",
        info: "#2F80ED",
        success: "#008F0B",
        warning: "#F5B900",
        error: "#E10000",
        offWhite: "#E5E5E5",
      },
    },
    fontFamily: {
      sans: ["GothamRounded", "sans-serif"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    ({ addUtilities }) => {
      addUtilities({
        ".flex-bet": {
          "@apply flex justify-between items-center": {},
        },
        ".flex-cen": {
          "@apply flex justify-center items-center": {},
        },
        ".flex-start": {
          "@apply flex justify-start items-center": {},
        },
        ".flex-end": {
          "@apply flex justify-end items-center": {},
        },
        ".flex-colm": {
          "@apply flex flex-col": {},
        },
      });
    },
  ],
};
