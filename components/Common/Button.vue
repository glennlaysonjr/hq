<script setup lang="ts">
import type { Button } from "@/types/button";
/*
Custom Button Component

- button (outerClass)
  -loading (spinner)
  - wrapperClass
      - prefixIcon
      - prefix (slot)
      - label
      - suffix (slot)
      - suffixIcon
  - end wrapperClass
- end button
*/

const props = withDefaults(defineProps<Button>(), {
  type: "primary",
  mode: "light",
  isSubmit: false,
});

//Set Colors
const color = toRef(props, "color");
const type = toRef(props, "type");
const isSubmit = toRef(props, "isSubmit");
const mode = toRef(props, "mode");

//Click Loading Function
const loading = toRef(props, "loading");
const hover = ref(false);

//End Click Loading Function
</script>

<template>
  <button
    v-if="type === 'primary'"
    class="max-w-fit rounded-full disabled:cursor-not-allowed relative disabled:opacity-20 disabled:pointer-events-none flex justify-between items-center transition duration-300 ease-in-out px-6 py-[9px] mt-2 min-w-[50px] text-xs font-semibold border-2 mb-2 lg:text-xl whitespace-nowrap"
    :class="{
      'border-white text-nblue-800 bg-white hover:bg-white/80': mode === 'dark',
      'border-nblue-800 text-white bg-nblue-800 hover:bg-nblue-800/80':
        mode === 'light',
    }"
    v-bind="$attrs"
    :type="isSubmit ? 'submit' : 'button'"
  >
    <div class="min-w-[75px]" v-if="loading">
      <Icon name="svg-spinners:ring-resize" class="text-lg" />
    </div>
    <div
      class="z-10 flex items-center justify-center"
      :class="wrapperClass"
      v-if="!loading"
    >
      <div
        class="mr-2 text-lg font-semibold leading-4"
        :class="`${prefixIconClass}`"
        v-if="prefixIcon"
      >
        <Icon :name="prefixIcon" />
      </div>
      <div :class="`${prefixClass}`">
        <slot name="prefix" />
      </div>
      <div
        class="flex justify-center text-xs font-bold leading-4 align-middle"
        :class="`${labelClass}`"
      >
        {{ label ?? "" }}
        <slot />
      </div>
      <div :class="`${suffixClass}`">
        <slot name="suffix" />
      </div>
      <div
        class="ml-2 text-lg leading-4"
        :class="`${suffixIconClass}`"
        v-if="suffixIcon"
      >
        <Icon :name="suffixIcon" />
      </div>
    </div>
  </button>

  <button
    v-if="type === 'ghost'"
    class="max-w-fit rounded-full disabled:cursor-not-allowed disabled:opacity-20 relative disabled:pointer-events-none flex justify-between items-center transition duration-300 ease-in-out px-6 py-[9px] mt-2 min-w-[50px] text-xs font-semibold border-2 mb-2 lg:text-xl whitespace-nowrap"
    :class="{
      'border-white text-white bg-transparent hover:text-nblue-800  hover:bg-white/80':
        mode === 'dark',
      'border-nblue-800 text-white hover:text-white hover:bg-nblue-800/80':
        mode === 'light',
    }"
    v-bind="$attrs"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :type="isSubmit ? 'submit' : 'button'"
  >
    <div class="min-w-[75px]" v-if="loading">
      <Icon name="svg-spinners:ring-resize" class="text-lg" />
    </div>
    <div
      class="z-10 flex items-center justify-center"
      :class="`${wrapperClass}`"
      v-if="!loading"
    >
      <div
        class="mr-2 text-lg font-semibold leading-4"
        :class="`${prefixIconClass}`"
        v-if="prefixIcon"
      >
        <Icon :name="prefixIcon" />
      </div>
      <div :class="`${prefixClass}`">
        <slot name="prefix" />
      </div>
      <div
        class="flex justify-center text-xs font-bold leading-4 align-middle"
        :class="`${labelClass}`"
      >
        {{ label ?? "" }}
        <slot />
      </div>
      <div :class="`${suffixClass}`">
        <slot name="suffix" />
      </div>
      <div
        class="ml-2 text-lg leading-4"
        :class="`${suffixIconClass}`"
        v-if="suffixIcon"
      >
        <Icon :name="suffixIcon" />
      </div>
    </div>
  </button>
  <button
    v-if="type === 'simple'"
    class="flex items-center justify-between px-0 mt-2 mb-2 text-xs font-semibold transition duration-300 ease-in-out bg-transparent border-0 max-w-fit disabled:cursor-not-allowed disabled:opacity-20 min-w-fit lg:text-xl whitespace-nowrap"
    :class="{
      ' text-nblue-800 hover:text-nblue-800/70': mode === 'light',
      ' text-white hover:text-white/70': mode === 'dark',
    }"
    v-bind="$attrs"
    :type="isSubmit ? 'submit' : 'button'"
  >
    <div
      class="z-10 flex items-center justify-center"
      :class="`${wrapperClass}`"
    >
      <Icon
        :name="prefixIcon"
        class="mr-1 text-lg font-semibold leading-4e"
        :class="`${prefixIconClass}`"
        v-if="prefixIcon"
      />
      <div class="" :class="`${prefixClass}`">
        <slot name="prefix" />
      </div>
      <div
        class="flex justify-center text-xs font-bold leading-4 align-middle"
        :class="`${labelClass}`"
      >
        {{ label ?? "" }}
        <slot />
      </div>
      <div class="" :class="`${suffixClass}`">
        <slot name="suffix" />
      </div>
      <Icon
        :name="suffixIcon"
        class="ml-1 text-lg leading-4"
        :class="`${suffixIconClass}`"
        v-if="suffixIcon"
      />
    </div>
  </button>
</template>
