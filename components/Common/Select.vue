<script setup lang="ts">
import { vElementVisibility, vOnClickOutside } from "@vueuse/components";
import { useEventListener } from "@vueuse/core";
import { clone } from "radash";

const props = defineProps<{
  type?: string;
  label?: string;
  options: object[];
  wrapperClass?: string;
  emptyMessage?: string;
  searchable?: boolean;
  modelValue: any;
  loading?: boolean;
  debounce?: number;
  hasNextPage?: boolean;
  fetchingNextPage?: boolean;
  validateMessage?: string;
}>();

const emits = defineEmits<{
  (e: "search", value: string): void;
  (e: "update:modelValue", value: any): void;
  (e: "select", value: any): void;
  (e: "nextPage", value: boolean): void;
  (e: "add", value: boolean): void;
}>();

const select = ref<HTMLDivElement>();
const selectInput = ref<HTMLInputElement>();
const list = ref<HTMLUListElement>();

onMounted(() => {
  selectInput.value = select.value?.$el.querySelector(".formkit-input");

  useEventListener(select.value, "keydown", (e) => {
    e.stopPropagation();
    handleKeyDown(e);
  });

  useEventListener(selectInput.value, "focus", (e) => {
    e.stopPropagation();
    showItems.value = true;
  });
});

const items = ref();
const itemClone = ref();

const slots = useSlots();

const form = ref({
  label: "",
  value: null,
});

watch(
  () => [props.modelValue, props.options],
  ([model, options]) => {
    if (options) {
      items.value = clone(options);
      itemClone.value = clone(options);
    }
    // if current value is nothing then dont set the label
    if (![null, "undefined", undefined, ""].includes(model) && options) {
      form.value = clone(options.find((item) => item.value === model));
    }
  },
  { immediate: true, deep: true, flush: "sync" },
);

const showItems = ref(false);
const activeIndex = ref(-1);

const setActiveIndex = (index) => {
  activeIndex.value = index;
};

const selectItem = async (item) => {
  form.value.label = item.label;
  form.value.value = item.value;

  emits("update:modelValue", item.value);
  emits("select", item);

  showItems.value = false;

  activeIndex.value = -1;
};

// Handle keyboard events for accessibility
const handleKeyDown = (event) => {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    if (activeIndex.value > 0) {
      activeIndex.value--;
    }
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    if (activeIndex.value < items.value.length - 1) {
      activeIndex.value++;
    }
  } else if (event.key === "Escape") {
    showItems.value = false;
    activeIndex.value = -1;
  } else if (event.key === "Enter" && activeIndex.value >= 0) {
    if (filteredList.value?.length > 0) {
      selectItem(filteredList.value[activeIndex.value]);
    } else {
      selectItem(items.value[activeIndex.value]);
    }
  } else if (event.key === "Tab") {
    showItems.value = false;
    activeIndex.value = -1;
  }
};

let searchText = ref("");
const filteredList = ref();
// Filter items based on search text or async search
const filterItems = async (e: any) => {
  if (e === form.value?.label && e !== "") {
    return;
  }

  if (props.searchable && e) {
    emits("search", e.toLowerCase());
    return;
  }

  if (e === "") {
    filteredList.value = [];
    items.value = itemClone.value;
    form.value.label = "";

    if (props.searchable) {
      emits("search", "");
    }
    // Clear model value on clear search
    emits("update:modelValue", undefined);

    // Show select item after clearing search
    showItems.value = true;
  }

  if (e === form.value?.label) {
    return;
  }

  if (e && !props.searchable) {
    searchText.value = e.toLowerCase();

    if (searchText) {
      filteredList.value = items.value.filter((item) =>
        item.label.toLowerCase().match(searchText.value),
      );
    }
  }
};

const getNextPage = (val) => {
  if (val) {
    emits("nextPage", true);
  }
};

const outSideDropdown = () => {
  showItems.value = false;
  activeIndex.value = -1;
};
</script>

<template>
  <div
    class="relative w-full min-w-fit"
    v-on-click-outside="outSideDropdown"
    :class="wrapperClass"
  >
    <FormKit
      v-bind="$attrs"
      type="text"
      ref="select"
      :model-value="form?.label"
      :label="label ? label : 'Select'"
      wrapper-class="relative"
      input-class="dark:!text-white"
      @input="filterItems($event)"
      autocomplete="off"
      :validation-message="validateMessage ?? 'Please select an item'"
    >
      <template #suffix>
        <Icon
          name="heroicons:chevron-down"
          class="absolute text-xl cursor-pointer right-3"
          @click="(showItems = !showItems), selectInput?.focus()"
        />
      </template>
    </FormKit>
    <div
      class="z-[60] bg-white dark:bg-midnight w-full overflow-y-auto max-h-[300px] absolute rounded border border-[#E4E7EB] dark:border-[#374151] -mt-2 shadow-input"
      v-if="showItems"
      ref="list"
    >
      <ol v-if="items?.length || slots.other" class="min-w-full">
        <template v-for="(item, index) in filteredList" :key="index">
          <li
            v-if="filteredList?.length"
            class="z-30 block min-w-full p-2 cursor-pointer pointer-events-auto hover:bg-gray-200 dark:hover:bg-darlPrimaryBG"
            :class="{
              'bg-gray-200 dark:bg-darkPrimaryBG': index === activeIndex,
            }"
            @mouseenter="setActiveIndex(index)"
            @click="selectItem(item)"
          >
            {{ item?.label }}
          </li>
        </template>
        <template v-for="(item, index) in items" :key="index">
          <li
            v-if="!filteredList?.length"
            class="z-30 block min-w-full p-2 cursor-pointer pointer-events-auto hover:bg-gray-200 dark:hover:bg-darlPrimaryBG"
            :class="{
              'bg-gray-200 dark:bg-darkPrimaryBG': index === activeIndex,
            }"
            @mouseenter="setActiveIndex(index)"
            @click="selectItem(item)"
          >
            {{ item?.label }}
          </li>
        </template>
        <li
          v-if="slots.other"
          @click="emits('add', true), outSideDropdown()"
          @mouseenter="setActiveIndex(items?.length + 1)"
          class="z-30 block min-w-full p-2 cursor-pointer pointer-events-auto hover:bg-gray-200 dark:hover:bg-darkPrimaryBG"
          :class="{
            'bg-gray-200 dark:bg-darkPrimaryBG':
              items?.length + 1 === activeIndex,
          }"
        >
          <slot name="other" />
        </li>
      </ol>
      <p
        v-if="!items?.length && !loading && !slots.other"
        class="z-30 min-w-full p-2 text-center cursor-pointer pointer-events-auto"
      >
        {{ emptyMessage ? emptyMessage : "Sorry, No results found" }}
      </p>
      <p
        class="z-30 min-w-full p-2 text-center cursor-pointer pointer-events-auto"
        v-if="fetchingNextPage || loading"
      >
        Loading...
      </p>
      <div
        v-element-visibility="getNextPage"
        v-if="hasNextPage"
        class="h-1"
      ></div>
    </div>
  </div>
</template>
