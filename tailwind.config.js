/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      borderRadius: {
        default: "6px",
      },
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
        gpurpleLight: "#D4D0E3",
        gpurpleDark: "#DCD7EB",
        input: "#888694",
        body: "#F7F6FF",
        info: "#2F80ED",
        success: "#008F0B",
        warning: "#F5B900",
        error: "#E10000",
        offWhite: "#E5E5E5",
      },
      boxShadow: {
        input: "0px 11px 32px -15px rgba(226, 224, 244, 0.85)",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      cursive: ["Kalam", "cursive"],
    },
    keyframes: {
      slideDownAndFade: {
        from: { opacity: 0, transform: "translateY(-2px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
      slideLeftAndFade: {
        from: { opacity: 0, transform: "translateX(2px)" },
        to: { opacity: 1, transform: "translateX(0)" },
      },
      slideUpAndFade: {
        from: { opacity: 0, transform: "translateY(2px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
      slideRightAndFade: {
        from: { opacity: 0, transform: "translateX(-2px)" },
        to: { opacity: 1, transform: "translateX(0)" },
      },
    },
    animation: {
      slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideRightAndFade:
        "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
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
