<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    alignment?: "start" | "center" | "end";
    avoidCollisions?: boolean;
    sideOffset?: number;
    modelValue?: boolean;
  }>(),
  {
    alignment: "center",
    avoidCollisions: true,
    sideOffset: 15,
  },
);
const emit = defineEmits(["update:modelValue"]);

const value = ref(false);

watch(
  () => props.modelValue,
  (newVal) => {
    value.value = newVal;
    emit("update:modelValue", newVal);
  },
  { immediate: true },
);

const { alignment, avoidCollisions, sideOffset } = toRefs(props);
</script>
<template>
  <PopoverRoot v-model:open="value">
    <PopoverTrigger>
      <slot />
    </PopoverTrigger>
    <PopoverContent
      :align="alignment"
      :avoidCollisions="avoidCollisions"
      :side-offset="sideOffset ?? 15"
    >
      <nav class="w-[300px] min-h-[50px] dark:text-white bg-midnight rounded">
        <div
          class="flex items-center px-4 py-3 bg-[#10151C] justify-between rounded-t w-full"
        >
          <div class="flex items-center gap-2 text-xs text-[#788291] w-full">
            <slot name="title" />
          </div>
        </div>
        <div class="w-full p-3 text-sm text-white text-white/80">
          <slot name="content" />
        </div>
      </nav>
    </PopoverContent>
  </PopoverRoot>
</template>
