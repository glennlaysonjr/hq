import type {
  DehydratedState,
  VueQueryPluginOptions,
} from "@tanstack/vue-query";
import {
  VueQueryPlugin,
  QueryClient,
  hydrate,
  dehydrate,
} from "@tanstack/vue-query";
// Nuxt 3 app aliases
import { useState } from "#app";

export default defineNuxtPlugin((nuxt) => {
  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 5000, refetchOnWindowFocus: false },
    },
  });
  const options: VueQueryPluginOptions = { queryClient };

  nuxt.vueApp.use(VueQueryPlugin, options);
  const vueQueryClient = useState<DehydratedState | null>("vue-query");

  if (process.server) {
    nuxt.hooks.hook("app:rendered", () => {
      vueQueryClient.value = dehydrate(queryClient);
    });
  }

  if (process.client) {
    nuxt.hooks.hook("app:created", () => {
      hydrate(queryClient, vueQueryClient.value);
    });
  }
});