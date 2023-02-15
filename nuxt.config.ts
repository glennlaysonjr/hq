// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    vue: {
      reactivityTransform: true,
    },
    optimizeDeps: {},
  },
  modules: [
    "@formkit/nuxt",

    "@vueuse/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore"],
      },
    ],
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
  ],
  alias: {},

  css: ["@/assets/css/tailwind.css"],

  runtimeConfig: {},
});
