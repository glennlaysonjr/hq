<script setup lang="ts">
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

const route = useRoute();

const { $directus, $readItems } = useNuxtApp();

// Fetch page data
const { data: page, suspense } = useQuery({
  queryKey: ["page", route.params.slug],
  queryFn: async () => {
    const res = await $directus.request(
      $readItems("pages", {
        filter: {
          slug: {
            _eq: route.params.slug,
          },
        },
        fields: [
          "*",
          "blocks.*",
          "blocks.item.*",
          "blocks.item.post_tags.*",
          "blocks.item.post_tags.tags_id.*",
        ],
      }),
    );
    return res?.[0];
  },
});
await suspense();

// If page is not published or is not published yet, throw 404
watch(
  () => page.value,
  (page) => {
    if (page) {
      if (
        page?.status !== "published" ||
        !dayjs().isSameOrAfter(page?.date_published)
      ) {
        throw createError({
          statusCode: 404,
          statusMessage: "Page Not Found",
        });
      }
    }
  },
  { immediate: true, deep: true },
);
</script>
<template>
  <NuxtLayout
    :name="page?.layout"
    :title="page?.title"
    :cover_image="page?.cover_image"
    :cover_size="page?.cover_size"
  >
    <main class="grid grid-cols-1 gap-y-8"></main>
  </NuxtLayout>
</template>
