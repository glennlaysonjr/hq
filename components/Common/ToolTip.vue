<script setup lang="ts">
const props = defineProps({
  tipPosition: {
    type: String,
    default: "top",
  },
  label: {
    type: String,
    default: "",
  },
});
const open = ref(false);
</script>
<template>
  <div @mouseover="open = true" @mouseleave="open = false" class="relative">
    <div
      class="absolute z-50 p-2 text-xs text-white bg-black rounded-md"
      :class="{
        'bottom-[150%]': tipPosition === 'top',
        'bottom-3': tipPosition === 'bottom',
        '-left-[10px]': tipPosition === 'left',
        '-right-[10px]': tipPosition === 'right',
      }"
      v-if="open"
      inert
      tip-position="right "
      role="tooltip"
    >
      {{ label }}
    </div>
    <slot :open="open" />
  </div>
</template>
<style scoped></style>
