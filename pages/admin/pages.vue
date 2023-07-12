<script setup lang="ts">
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent, VueNodeViewRenderer } from "@tiptap/vue-3";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import CodeBlockVue from "@/components/Admin/CodeBlock.vue";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import php from "highlight.js/lib/languages/php";
import { lowlight } from "lowlight";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("php", php);

const content = ref<String>("");
const showHighlight = ref<Boolean>(false);

const coverImg = ref();
interface Form {
  title: String;
  slug: String;
  content: {
    cover_img: String;
    body: String;
  };
  description?: String;
  published: boolean;
}

const form = ref<Form>({
  title: "",
  slug: "",
  content: {
    cover_img: "",
    body: "",
  },
  description: "",
  published: false,
});

const editor: Editor | any = ref();

watch(
  () => content.value,
  (value) => {
    form.value.content.body = value;
  },
);

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return VueNodeViewRenderer(CodeBlockVue);
        },
      }).configure({ lowlight }),
    ],
    content: content.value,
    onUpdate: ({ editor }) => {
      content.value = editor.getHTML();
    },
  });
  console.log(editor.value);
});
onBeforeUnmount(() => {
  editor.value.destroy();
});
</script>

<template>
  <div class="">
    <main class="flex flex-col justify-center w-full">
      <div class="flex flex-col px-5 max-w-[1200px]">
        <FormKit type="form" :actions="false">
          <div>
            <FormKit
              type="text"
              v-model="form.title"
              validation="requried"
              placeholder="Page Title"
              inner-class="!ring-0 bg-gpurple/10 !text-3xl"
              input-class="!text-3xl !font-medium min-h-[4rem]"
            />
          </div>
          <div class="flex flex-row gap-3">
            <FormKit
              type="text"
              v-model="form.slug"
              validation="requried"
              placeholder="your-slug-here"
            />
            <CommonSwitch v-model:toggle="form.published" label="Published" />
          </div>
          <div class="flex flex-col">
            <FormKit
              type="text"
              v-model="form.description"
              placeholder="Description"
            />
            <FormKit
              type="file"
              v-model="coverImg"
              validation="requried"
              placeholder="Set Cover Image"
            />
          </div>
        </FormKit>
      </div>
      <div class="px-5 max-w-[1200px]">
        <ClientOnly>
          <div
            class="flex flex-wrap justify-start p-2 space-x-1 border rounded-t-xl dark:border-zinc-700"
          >
            <button
              class="editor-button"
              v-tippy="{ content: 'Bold', placement: 'bottom' }"
              @click="editor.chain().focus().toggleBold().run()"
            >
              <Icon name="material-symbols:format-bold-rounded" />
            </button>
            <button
              class="editor-button"
              v-tippy="{ content: 'Italic', placement: 'bottom' }"
              @click="editor.chain().focus().toggleItalic().run()"
            >
              <Icon name="material-symbols:format-italic-rounded" />
            </button>
            <button
              class="editor-button"
              v-tippy="{ content: 'Strike', placement: 'bottom' }"
              @click="editor.chain().focus().toggleStrike().run()"
            >
              <Icon name="material-symbols:format-strikethrough-rounded" />
            </button>
            <button
              class="editor-button"
              v-tippy="{ content: 'Code Block', placement: 'bottom' }"
              @click="editor.chain().focus().toggleCodeBlock().run()"
            >
              <Icon name="material-symbols:code-blocks-rounded" />
            </button>
            <button
              class="editor-button"
              v-tippy="{ content: 'Paragraph', placement: 'bottom' }"
              @click="editor.chain().focus().setParagraph().run()"
            >
              <Icon name="material-symbols:format-paragraph-rounded" />
            </button>
            <UPopover>
              <button
                class="editor-button"
                v-tippy="{ content: 'Headings', placement: 'bottom' }"
              >
                <Icon name="material-symbols:format-h1-rounded" />
              </button>

              <template #panel>
                <!-- Content -->
                <button
                  class="editor-button !text-[#EAE5FD] !text-lg"
                  v-tippy="{ content: 'Heading 1', placement: 'bottom' }"
                  @click="
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  "
                >
                  <Icon name="material-symbols:format-h1-rounded" />
                </button>

                <button
                  v-tippy="{ content: 'Heading 2', placement: 'bottom' }"
                  class="editor-button !text-[#EAE5FD] !text-lg"
                  @click="
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  "
                >
                  <Icon name="material-symbols:format-h2-rounded" />
                </button>

                <button
                  v-tippy="{ content: 'Heading 3', placement: 'bottom' }"
                  class="editor-button !text-[#EAE5FD] !text-lg"
                  @click="
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  "
                >
                  <Icon name="material-symbols:format-h3-rounded" />
                </button>
              </template>
            </UPopover>

            <button
              class="editor-button"
              v-tippy="{ content: 'Bullet List', placement: 'bottom' }"
              @click="editor.chain().focus().toggleBulletList().run()"
            >
              <Icon name="material-symbols:format-list-bulleted-rounded" />
            </button>

            <button
              class="editor-button"
              v-tippy="{ content: 'Number List', placement: 'bottom' }"
              @click="editor.chain().focus().toggleOrderedList().run()"
            >
              <Icon name="material-symbols:format-list-numbered-rounded" />
            </button>

            <button
              class="editor-button"
              v-tippy="{ content: 'Quote Block', placement: 'bottom' }"
              @click="editor.chain().focus().toggleBlockquote().run()"
            >
              <Icon name="material-symbols:format-quote-rounded" />
            </button>

            <button
              class="editor-button"
              v-tippy="{ content: 'Line Brake', placement: 'bottom' }"
              @click="editor.chain().focus().setHorizontalRule().run()"
            >
              <Icon name="material-symbols:horizontal-rule-rounded" />
            </button>
            <UPopover>
              <button
                class="editor-button"
                v-tippy="{ content: 'Highlight', placement: 'bottom' }"
              >
                <Icon name="material-symbols:ink-highlighter-rounded" />
              </button>
              <template #panel>
                <div
                  class="flex flex-wrap justify-start p-2 space-x-1 border border-t-0 dark:border-zinc-700"
                >
                  <button
                    @click="
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: '#ffc078' })
                        .run()
                    "
                  >
                    <div class="w-6 h-6 rounded-full bg-[#ffc078]"></div>
                  </button>
                  <button
                    @click="
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: '#fff350' })
                        .run()
                    "
                  >
                    <div class="w-6 h-6 rounded-full bg-[#fff350]"></div>
                  </button>
                  <button
                    @click="
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: '#8ce99a' })
                        .run()
                    "
                  >
                    <div class="w-6 h-6 rounded-full bg-[#8ce99a]"></div>
                  </button>
                  <button
                    @click="
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: '#74c0fc' })
                        .run()
                    "
                  >
                    <div class="w-6 h-6 rounded-full bg-[#74c0fc]"></div>
                  </button>
                  <button
                    @click="
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: '#b197fc' })
                        .run()
                    "
                  >
                    <div class="w-6 h-6 rounded-full bg-[#b197fc]"></div>
                  </button>
                  <button
                    @click="
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: '#f8bbd0' })
                        .run()
                    "
                  >
                    <div class="w-6 h-6 rounded-full bg-[#f8bbd0]"></div>
                  </button>
                  <button
                    @click="
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: 'red' })
                        .run()
                    "
                  >
                    <div class="w-6 h-6 rounded-full bg-[red]"></div>
                  </button>
                  <button
                    @click="
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: '#e0e0e0' })
                        .run()
                    "
                  >
                    <div class="w-6 h-6 rounded-full bg-[#e0e0e0]"></div>
                  </button>

                  <button
                    @click="
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: 'transparent' })
                        .run()
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M7 12c0 .55.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1zm5-10C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"
                      />
                    </svg>
                  </button>
                </div>
              </template>
            </UPopover>
            <UPopover>
              <button
                class="editor-button"
                v-tippy="{ content: 'Alignment', placement: 'bottom' }"
              >
                <Icon name="material-symbols:align-horizontal-left-rounded" />
              </button>

              <template #panel>
                <!-- Content -->
                <button
                  class="editor-button !text-[#EAE5FD] !text-lg"
                  v-tippy="{ content: 'Left Align', placement: 'bottom' }"
                  @click="editor.chain().focus().setTextAlign('left').run()"
                >
                  <Icon name="material-symbols:align-horizontal-left-rounded" />
                </button>
                <button
                  v-tippy="{ content: 'Center Align', placement: 'bottom' }"
                  class="editor-button !text-[#EAE5FD] !text-lg"
                  @click="editor.chain().focus().setTextAlign('center').run()"
                >
                  <Icon
                    name="material-symbols:align-horizontal-center-rounded"
                  />
                </button>
                <button
                  v-tippy="{ content: 'Right Align', placement: 'bottom' }"
                  class="editor-button !text-[#EAE5FD] !text-lg"
                  @click="editor.chain().focus().setTextAlign('right').run()"
                >
                  <Icon
                    name="material-symbols:align-horizontal-right-rounded"
                  />
                </button>

                <button
                  v-tippy="{ content: 'Justify', placement: 'bottom' }"
                  class="editor-button !text-[#EAE5FD] !text-lg"
                  @click="editor.chain().focus().setTextAlign('justify').run()"
                >
                  <Icon name="material-symbols:format-align-justify-rounded" />
                </button>
              </template>
            </UPopover>

            <UTooltip text="Undo">
              <button
                class="editor-button"
                v-tippy="{ content: 'Undo', placement: 'bottom' }"
                @click="editor.chain().focus().undo().run()"
              >
                <Icon name="material-symbols:undo-rounded" />
              </button>
            </UTooltip>
            <UTooltip text="Redo">
              <button
                class="editor-button"
                v-tippy="{ content: 'Redo', placement: 'bottom' }"
                @click="editor.chain().focus().redo().run()"
              >
                <Icon name="material-symbols:redo-rounded" />
              </button>
            </UTooltip>
          </div>
          <div class="border border-t-0 border-zinc-700 bg-gpurple/10">
            <EditorContent
              v-model="content"
              :editor="editor"
              class="p-1 !space-y-1 cursor-text"
            />
          </div>
        </ClientOnly>
      </div>
      {{ content }}
    </main>
  </div>
</template>

<style>
.editor-button {
  @apply text-gpurple dark:text-gpurple text-xl hover:bg-gpurple/10 w-8 rounded-md cursor-fancy;
}
.editor-button .is-active {
  @apply bg-gpurple/10;
}
.ProseMirror {
  min-height: 15rem;
  outline: none;
  @apply prose  !w-full !max-w-full !space-y-0;
}
.ProseMirror p {
  @apply !m-0;
}
.ProseMirror p:first-child {
  @apply !mt-0;
}
.ProseMirror p:last-child {
  @apply !mb-0;
}
.ProseMirror h1 {
  @apply !m-0;
}
.ProseMirror h1:first-child {
  @apply !mt-0;
}
.ProseMirror h1:last-child {
  @apply !mb-0;
}
.ProseMirror h2 {
  @apply !m-0;
}
.ProseMirror h2:first-child {
  @apply !mt-0;
}
.ProseMirror h2:last-child {
  @apply !mb-0;
}
.ProseMirror h3 {
  @apply !m-0;
}
.ProseMirror h3:first-child {
  @apply !mt-0;
}
.ProseMirror h3:last-child {
  @apply !mb-0;
}
.ProseMirror ul {
  @apply !m-0;
}
.ProseMirror ul:first-child {
  @apply !mt-0;
}
.ProseMirror ul:last-child {
  @apply !mb-0;
}
.ProseMirror ol {
  @apply !m-0;
}
.ProseMirror ol:first-child {
  @apply !mt-0;
}
.ProseMirror ol:last-child {
  @apply !mb-0;
}
.ProseMirror li {
  @apply !m-0;
}
.ProseMirror li:first-child {
  @apply !mt-0;
}
.ProseMirror li:last-child {
  @apply !mb-0;
}
.ProseMirror li p {
  @apply !m-0;
}
.ProseMirror li p:first-child {
  @apply !mt-0;
}
.ProseMirror li p:last-child {
  @apply !mb-0;
}
.ProseMirror li > ul {
  @apply !mt-0;
}
.ProseMirror li > ul:first-child {
  @apply !mt-0;
}
.ProseMirror li > ul:last-child {
  @apply !mb-0;
}

.ProseMirror-focused {
  @apply outline-none !space-y-0;
}

pre {
  background: #0d0d0d;
  color: #fff;
  font-family: "JetBrainsMono", monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

pre code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}

pre .hljs-comment,
pre .hljs-quote {
  color: #616161;
}

pre .hljs-variable,
pre .hljs-template-variable,
pre .hljs-attribute,
pre .hljs-tag,
pre .hljs-name,
pre .hljs-regexp,
pre .hljs-link,
pre .hljs-name,
pre .hljs-selector-id,
pre .hljs-selector-class {
  color: #f98181;
}

pre .hljs-number,
pre .hljs-meta,
pre .hljs-built_in,
pre .hljs-builtin-name,
pre .hljs-literal,
pre .hljs-type,
pre .hljs-params {
  color: #fbbc88;
}

pre .hljs-string,
pre .hljs-symbol,
pre .hljs-bullet {
  color: #b9f18d;
}

pre .hljs-title,
pre .hljs-section {
  color: #faf594;
}

pre .hljs-keyword,
pre .hljs-selector-tag {
  color: #70cff8;
}

pre .hljs-emphasis {
  font-style: italic;
}

pre .hljs-strong {
  font-weight: 700;
}
</style>
