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
    "nuxt-headlessui",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/ui",
    "radix-vue/nuxt",
    "@hebilicious/vue-query-nuxt",
    "@stefanobartoletti/nuxt-social-share",
  ],
  headlessui: {
    prefix: "Headless",
  },
  vueQuery: {
    // useState key used by nuxt for the vue query state.
    stateKey: "vue-query-nuxt", // default
    // If you only want to import some functions, specify them here.
    // You can pass false or an empty array to disable this feature.
    // default: ["useQuery", "useQueries", "useInfiniteQuery", "useMutation", "useIsFetching", "useIsMutating", "useQueryClient"]
    //autoImports: ["useQuery"],
    // Pass the vue query client options here ...
    queryClientOptions: {
      defaultOptions: { queries: { staleTime: 5000 } }, // default
    },
    // Pass the vue query plugin options here ....
    vueQueryPluginOptions: {},
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {},
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg", // Replace with the relative path of your SVG favicon file
        },
      ],
    },
  },
  ssr: true,
  runtimeConfig: {
    public: {
      directusUrl: "",
    },
  },
  colorMode: {
    preference: "light",
  },
  devtools: { enabled: true },
});
