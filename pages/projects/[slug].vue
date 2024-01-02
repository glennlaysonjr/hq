<script setup lang="ts">
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import relativeTime from "dayjs/plugin/relativeTime";
import Prism from "prismjs";

onMounted(() => {
  Prism.highlightAll();
});

dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);

const route = useRoute();

const { $directus, $readItems } = useNuxtApp();

// Fetch page data
const { data: write_ups, suspense } = useQuery({
  queryKey: ["write_ups", "index"],
  queryFn: async () => {
    const res = await $directus.request(
      $readItems("write_ups", {
        filter: {
          date_published: {
            _lte: dayjs().format("YYYY-MM-DD"),
          },
        },
        sort: "-date_published",
        fields: [
          "title",
          "slug",
          "date_published",
          "status",
          "tags",
          "cover_image",
          "user_created.*",
          "read_time",
          "tags.*",
          "tags.tags_id.*",
        ],
      }),
    );
    return res;
  },
});
await suspense();

// If write_ups is not published or is not published yet, throw 404
// watch(
//   () => write_ups.value,
//   async (write_ups) => {
//     if (write_ups) {
//       if (
//         write_ups?.status !== "published" ||
//         !dayjs().isSameOrAfter(write_ups?.date_published)
//       ) {
//         throw createError({
//           statusCode: 404,
//           statusMessage: "write_ups Not Found",
//         });
//       }
//     }
//   },
//   { immediate: true, deep: true },
// );
</script>
<template>
  <NuxtLayout :name="write_ups?.layout">
    <main class="grid grid-cols-1 px-6 pt-8">
      <div class="max-w-[1200px] mx-auto w-full">
        <h1
          class="text-7xl leading-10 sm:leading-[155px] sm:text-[155px] sm:tracking-[-12px] tracking-tight font-bold text-[#BAA7F5] hover:text-[#1B006B] transition-all ease-in-out duration-500 max-w-fit pb-0 sm:-mb-9 -mb-0 z-0 px-4"
        >
          Projects
        </h1>
      </div>
      <article
        class="z-10 min-h-60 sm:px-7 flex flex-col gap-y-3 py-8 mt-0 max-w-[1200px] bg-white rounded-t-3xl mx-auto w-full"
      >
        <template v-for="write_up in write_ups">
          <div class="p-8 border-2 rounded-3xl hover:border-gpurple/30">
            <div class="flex items-center gap-2">
              <div>
                <img
                  :src="`https://core.glennlayson.com/assets/${write_up.user_created.avatar}`"
                  alt="avatar"
                  class="w-7 h-7"
                />
              </div>
              <div>
                <p class="text-xs font-semibold">
                  {{ write_up.user_created.first_name }}
                  {{ write_up.user_created.last_name }}
                </p>
                <p class="text-[10px]">
                  {{ dayjs(write_up.date_published).format("MMM D") }}
                  ({{ dayjs(write_up.date_published).fromNow() }})
                </p>
              </div>
            </div>
            <h2 class="mt-3">
              <NuxtLink :to="`/write-ups/${write_up.slug}`">
                {{ write_up.title }}
              </NuxtLink>
            </h2>
            <div class="flex items-center justify-between">
              <p class="flex gap-1 mt-3">
                <template v-for="tag in write_up.tags">
                  <NuxtLink
                    class="px-2 text-sm transition-all duration-500 ease-in-out border-2 border-transparent rounded-md text-gpurple hover:border-gpurple/10"
                    :to="`/write-ups/tags/${tag.tags_id.tag}`"
                  >
                    #{{ tag.tags_id.tag }}
                  </NuxtLink>
                </template>
              </p>
              <p class="text-xs font-semibold">
                {{ write_up.read_time }} min read
              </p>
            </div>
          </div>
        </template>
      </article>
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
