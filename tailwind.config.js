const defaultTheme = require("tailwindcss/defaultTheme");

/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./formkit.config.ts",
    "./node_modules/flowbite/**/*.js'",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      boxShadow: {
        card: "0px 4px 41px -17px rgba(0, 0, 0, 0.25);",
        light: "0px 2.52381px 25.8691px -10.7262px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        gray: {
          50: "#F4F4F4",
          100: "#E0E0E0",
          200: "#BDBDBD",
          300: "#828282",
          400: "#4F4F4F",
          500: "#333333",
          800: "#282828",
          900: "#1D1D1D",
        },
        crayola: "#FFE67E",
        state: {
          info: "#C6C6C6",
          success: "#04D200",
          warning: "#F5B900",
          error: "#E10000",
        },
      },
    },
  },
  plugins: [],
};
