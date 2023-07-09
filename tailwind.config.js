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
    },
    fontFamily: {
      sans: ["GothamRounded", "sans-serif"],
    },
    colors: {
      primary: "#5822f6",
      gpurple: "#5822f6",
      info: "#2F80ED",
      success: "#008F0B",
      warning: "#F5B900",
      error: "#E10000",
      offWhite: "#E5E5E5",
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      red: colors.red,
      blue: colors.indigo,
    },
  },
  plugins: [],
};
