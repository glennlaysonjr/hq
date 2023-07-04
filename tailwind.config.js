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
    "./node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs",
    "./app.vue",
  ],
  theme: {
    extend: {},
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
