<script setup lang="ts">
import { Switch } from "@headlessui/vue";

interface Props {
  toggle: boolean;
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  toggle: false,
});

const emits = defineEmits<{
  (e: "update:toggle", value: boolean): void;
}>();
</script>
<template>
  <div>
    <Switch
      v-model="props.toggle"
      @update:model-value="emits('update:toggle', $event)"
      class="relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 rounded-full !cursor-fancy group focus:outline-none focus:ring-0"
    >
      <span
        aria-hidden="true"
        :class="[
          toggle ? 'bg-gpurple' : 'bg-white',
          'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out',
        ]"
      />
      <span
        aria-hidden="true"
        :class="[
          toggle ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out',
        ]"
      />
    </Switch>
    <label class="font-medium">{{ label }}</label>
  </div>
</template>
