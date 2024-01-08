<script setup lang="ts">
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

const { $directus, $readItems, $updateItem } = useNuxtApp();

// Fetch page data
const {
  data: write_ups,
  suspense,
  refetch,
} = useQuery({
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

const feedback_likes = ref(0);
const feedback_exploding = ref(0);
const feedback_fires = ref(0);
const feedback_unicorns = ref(0);
const feedback_rasied_hands = ref(0);

watch(
  () => write_ups.value,
  () => {
    if (write_ups.value) {
      feedback_likes.value = write_ups.value?.feedback_likes ?? 0;
      feedback_exploding.value = write_ups.value?.feedback_exploding ?? 0;
      feedback_fires.value = write_ups.value?.feedback_fires ?? 0;
      feedback_unicorns.value = write_ups.value?.feedback_unicorns ?? 0;
      feedback_rasied_hands.value = write_ups.value?.feedback_rasied_hands ?? 0;
    }
  },
  { immediate: true, deep: true },
);

// Add feedback
const { mutate: addFeedback } = useMutation({
  mutationFn: async (feedback: string) => {
    return await $directus.request(
      $updateItem("write_ups", write_ups.value?.id, {
        feedback_likes: feedback === "like" ? feedback_likes.value : undefined,
        feedback_exploding:
          feedback === "exploding" ? feedback_exploding.value : undefined,
        feedback_fires: feedback === "fire" ? feedback_fires.value : undefined,
        feedback_unicorns:
          feedback === "unicorn" ? feedback_unicorns.value : undefined,
      }),
    );
  },
  onSuccess: () => {
    refetch();
    console.log("Feedback added");
  },
});
</script>
<template>
  <NuxtLayout name="default">
    <main class="grid grid-cols-1 px-6 pt-8">
      <div class="max-w-[1200px] mx-auto w-full">
        <h1
          class="text-7xl leading-[4.5rem] sm:leading-[6rem] sm:text-[7rem] sm:tracking-[-10px] tracking-tight font-bold text-[#BAA7F5] hover:text-[#1B006B] transition-all ease-in-out duration-500 max-w-fit pb-0 sm:-mb-4 -mb-0 z-0 px-4"
        >
          {{ write_ups?.title }}
        </h1>
      </div>
      <article
        class="z-10 min-h-60 px-2 sm:px-7 flex flex-col gap-y-3 py-8 mt-0 max-w-[1200px] bg-white rounded-t-3xl mx-auto w-full"
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
      <div
        class="bg-white my-5 max-w-[1200px] w-full mx-auto border-gpurple/10 border rounded-lg shadow-[0px_11px_50px_-15px_#E2E0F4] p-8"
      >
        <p>What do you think...</p>
        <h4>How helpful was this article?</h4>
        <div
          class="flex flex-wrap gap-3 my-4 sm:flex-nowrap"
          @click.once="addFeedback('like'), feedback_likes++"
        >
          <CommonToolTip>
            <div class="feedback">
              <Icon name="noto-v1:thumbs-up" class="text-2xl text-red-600" />
              {{ feedback_likes ?? 0 }}
            </div>
            <template #content> Like </template>
          </CommonToolTip>
          <CommonToolTip>
            <div
              class="feedback"
              @click.once="addFeedback('exploding'), feedback_exploding++"
            >
              <Icon name="noto:exploding-head" class="text-2xl text-red-600" />
              {{ feedback_exploding ?? 0 }}
            </div>
            <template #content> Exploding Head </template>
          </CommonToolTip>
          <CommonToolTip>
            <div
              class="feedback"
              @click.once="addFeedback('exploding'), feedback_exploding++"
            >
              <Icon name="noto:clapping-hands" class="text-2xl text-red-600" />
              {{ feedback_rasied_hands ?? 0 }}
            </div>
            <template #content> Clapping Hands </template>
          </CommonToolTip>
          <CommonToolTip>
            <div
              class="feedback"
              @click.once="addFeedback('fire'), feedback_fires++"
            >
              <Icon name="emojione:fire" class="text-2xl text-red-600" />
              {{ feedback_fires ?? 0 }}
            </div>
            <template #content> Fire </template>
          </CommonToolTip>
          <CommonToolTip>
            <div
              class="feedback"
              @click.once="addFeedback('rocket'), feedback_unicorns++"
            >
              <Icon name="fluent-emoji:rocket" class="text-2xl text-red-600" />
              {{ feedback_unicorns ?? 0 }}
            </div>
            <template #content> Rocket </template>
          </CommonToolTip>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
<style>
@import url("~/assets/css/theme.css");

.feedback {
  @apply flex gap-1 justify-center hover:border-gpurple/80 items-center w-full border border-gpurple/10 rounded-md p-2;
}

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
