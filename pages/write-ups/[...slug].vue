<script setup lang="ts">
await import("@/assets/css/theme.css");
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import relativeTime from "dayjs/plugin/relativeTime";
import Prism from "prismjs";

onMounted(async () => {
  await Prism.highlightAll();
});

dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);

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
        fields: [
          "*",
          "tags.*",
          "tags.tags_id.*",
          "user_created.*",
          "feedback.*",
        ],
      }),
    );
    return res?.[0];
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

// Calculate reading time
function readingTime(text: any) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}

// Copy code block to clipboard
const source = ref("");
const { text, copy, copied, isSupported } = useClipboard({ source });
async function handleCopyClick(evt) {
  const { children } = evt.target.parentElement;
  const { innerText } = Array.from(children)[0];

  source.value = innerText.replace(/<[^>]*>/g, "");

  await copy();

  if (copied.value) {
    evt.target.innerHTML = "Copied!";
    setTimeout(() => {
      evt.target.innerHTML = "Copy";
    }, 2000);
    source.value = "";
  } else {
    evt.target.innerHTML = "Error";
    setTimeout(() => {
      evt.target.innerHTML = "Copy";
    }, 2000);
  }
}

onMounted(() => {
  // Add copy button to code blocks
  const highlights = document.querySelectorAll("pre");

  highlights.forEach((div) => {
    const copy = document.createElement("button");
    copy.innerHTML = "Copy";
    copy.addEventListener("click", handleCopyClick);
    div.append(copy);
  });
});
</script>
<template>
  <NuxtLayout :name="write_ups?.layout">
    <main class="grid grid-cols-1 px-6 pt-8">
      <div class="max-w-[1200px] mx-auto w-full">
        <h1
          class="text-7xl leading-10 sm:leading-[85px] sm:text-[100px] sm:tracking-[-8px] tracking-tight font-bold text-[#BAA7F5] hover:text-[#1B006B] transition-all ease-in-out duration-500 max-w-fit pb-0 sm:-mb-4 -mb-0 z-0 px-4"
        >
          {{ write_ups?.title }}
        </h1>
      </div>
      <article
        class="z-10 min-h-60 sm:px-7 flex flex-col gap-y-3 py-8 mt-0 max-w-[1200px] bg-white rounded-t-3xl mx-auto w-full"
      >
        <img
          :src="`https://core.glennlayson.com/assets/${write_ups.cover_image}`"
          class="object-cover w-full rounded-md max-h-[250px] sm:max-h-[400px]"
        />

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div>
              <img
                :src="`https://core.glennlayson.com/assets/${write_ups.user_created.avatar}`"
                alt="avatar"
                class="w-7 h-7"
              />
            </div>
            <div>
              <p class="text-xs font-semibold">
                {{ write_ups.user_created.first_name }}
                {{ write_ups.user_created.last_name }}
              </p>
              <p class="text-[10px]">
                {{ dayjs(write_ups.date_published).format("MMM D") }}
                ({{ dayjs(write_ups.date_published).fromNow() }})
              </p>
            </div>
          </div>

          <p class="text-xs font-semibold">
            {{ readingTime(write_ups.markdown) }} min read
          </p>
        </div>
        <p class="flex w-full gap-1 mt-3">
          <template v-for="tag in write_ups?.tags">
            <NuxtLink
              class="px-2 text-sm transition-all duration-500 ease-in-out border-2 border-transparent rounded-md text-gpurple hover:border-gpurple/10"
              :to="`/write-ups/tags/${tag?.tags_id.tag}`"
              :class="{
                'border-gpurple/10': tag?.tags_id.tag === route.params.tag,
              }"
            >
              #{{ tag.tags_id.tag }}
            </NuxtLink>
          </template>
        </p>
        <article
          id="content"
          class="z-10 prose prose-h2:text-4xl sm:prose-h2:text-5xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:tracking-[-2px] sm:prose-h2:tracking-[-3px] prose-h3:text-2xl prose-h3:tracking-[-1px] prose-img:my-0 prose-p:mb-0 prose-blockquote:not-italic prose-hr:mb-5 mt-0 prose-img:rounded-md max-w-[1200px] bg-white rounded-t-3xl mx-auto w-full"
          v-html="$mdRenderer.render(write_ups?.markdown)"
        />
        <div class="flex flex-row gap-2 mt-8">
          <h4 class="text-sm font-semibold">Share this write up:</h4>
          <SocialShare
            v-for="network in ['facebook', 'twitter', 'linkedin', 'email']"
            :key="network"
            :network="network"
            :styled="false"
            :label="false"
            class="text-xs rounded"
          />
        </div>
      </article>
    </main>
  </NuxtLayout>
</template>
<style>
/* CSS hack to resize icons by targeting a hash string */
img[src*="#icon"] {
  display: inline-block;
  width: 20px;
  margin-right: 5px;
  margin-top: -4px;
  height: 20px;
}
pre[class*="language-"] button {
  color: #ffffff;
  box-sizing: border-box;
  transition: 0.2s ease-out;
  cursor: pointer;
  user-select: none;
  background: #5822f6;
  padding: 2px 10px;
  font-size: 0.7em;
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 10px;
}

pre[class*="language-"] button:hover {
  background: #5722f6c4;
}
</style>
