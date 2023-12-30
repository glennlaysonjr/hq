<script setup lang="ts">
await import("@/assets/css/theme.css");
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import Prism from "prismjs";

onMounted(() => {
  Prism.highlightAll();
});

dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

const route = useRoute();

const { $directus, $readItems } = useNuxtApp();

// Fetch page data
const { data: write_ups, suspense } = useQuery({
  queryKey: ["write_ups", route.params.slug],
  queryFn: async () => {
    const res = await $directus.request(
      $readItems("write_ups", {
        filter: {
          slug: {
            _eq: route.params.slug,
          },
        },
        fields: ["*", "markdown"],
      }),
    );
    return res?.[0];
  },
});
await suspense();

// If page is not published or is not published yet, throw 404
watch(
  () => write_ups.value,
  async (write_ups) => {
    if (write_ups) {
      if (
        write_ups?.status !== "published" ||
        !dayjs().isSameOrAfter(write_ups?.date_published)
      ) {
        throw createError({
          statusCode: 404,
          statusMessage: "Write Up Not Found",
        });
      }
    }
  },
  { immediate: true, deep: true },
);
</script>
<template>
  <NuxtLayout
    :name="write_ups?.layout"
    :title="write_ups?.title"
    :cover_image="write_ups?.cover_image"
  >
    <main class="grid grid-cols-1 gap-y-8">
      <article
        class="prose prose-img:rounded-md max-w-none"
        v-html="$mdRenderer.render(write_ups?.markdown)"
      />
    </main>
  </NuxtLayout>
</template>
