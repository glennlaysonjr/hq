import {
  aggregate,
  createDirectus,
  readItem,
  readItems,
  readSingleton,
  rest,
} from "@directus/sdk";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const directus = createDirectus(config.public.directusUrl).with(rest());
  return {
    provide: { directus, readItem, readItems, readSingleton, aggregate },
  };
});
