// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    vue: {
      reactivityTransform: true,
    },
    optimizeDeps: {},
    plugins: [],
  },
  css: ["@/assets/css/tailwind.css"],
  modules: [
    "nuxt-icon",
    "@nuxthq/ui",
    "nuxt-headlessui",
    "@pinia/nuxt",
    "@formkit/nuxt",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
  ],
  formkit: {
    configFile: "@/formkit.config.ts",
  },
  headlessui: {
    prefix: "Headless",
  },
  supabase: {
    // Options
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {},
  devtools: { enabled: true },
});
