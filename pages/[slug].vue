<script setup lang="ts">
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
        fields: ["*", "markdown"],
      }),
    );
    return res?.[0];
  },
});
await suspense();

// If page is not published or is not published yet, throw 404
watch(
  () => page.value,
  async (page) => {
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

const testClick = () => {
  console.log("test");
};
</script>
<template>
  <NuxtLayout name="default">
    <main class="grid grid-cols-1 px-6 pt-8">
      <div class="max-w-[1200px] mx-auto w-full">
        <h1
          class="text-7xl leading-10 sm:leading-[155px] sm:text-[9rem] sm:tracking-[-12px] tracking-tight font-bold text-[#BAA7F5] hover:text-[#1B006B] transition-all ease-in-out duration-500 max-w-fit pb-0 sm:-mb-9 -mb-0 z-0 px-4"
        >
          {{ page?.title }}
        </h1>
      </div>

      <article
        class="z-10 prose prose-h2:text-[2.5rem] prose-code:bg-black prose-code:rounded-md prose-code:font-light prose-code:text-white prose-code:px-2 prose-code:before:content-[''] prose-code:after:content-[''] prose-code:italic prose-h2:leading-[2rem] sm:prose-h2:leading-[4rem] sm:prose-h2:text-[4rem] prose-h2:tracking-[-1px] sm:prose-h2:tracking-[-3px] prose-h3:text-2xl prose-h3:tracking-[-1px] prose-img:my-0 prose-p:mb-0 prose-blockquote:not-italic prose-hr:mb-5 px-6 sm:px-7 py-8 mt-0 prose-img:rounded-md max-w-[1200px] bg-white rounded-t-3xl mx-auto w-full"
        v-html="$mdRenderer.render(page?.markdown ?? '')"
      />
    </main>
  </NuxtLayout>
</template>
<style>
@import url("~/assets/css/theme.css");

/* CSS hack to resize icons by targeting a hash string */
img[src*="#icon"] {
  display: inline-block;
  width: 20px;
  margin-right: 5px;
  margin-top: -4px;
  height: 20px;
}
</style>
