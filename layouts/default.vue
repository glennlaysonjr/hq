<script setup lang="ts">
import { useMouse } from "@vueuse/core";
import Switch from "components/Common/Switch.vue";
const { x, y, sourceType } = useMouse();

const enabled = ref(false);
</script>
<template>
  <main
    class="h-screen bg-gradient-to-b from-[#E1DFF3] to-transparent to-40% w-full"
  >
    <header class="flex items-center justify-between w-full h-16 header-border">
      <div
        class="flex items-center justify-between w-full h-full px-4 pt-6 pb-4"
      >
        <div class="">
          <SystemLogo class="w-10" />
        </div>
        <div>
          <SystemNav />
        </div>
        <div class="flex items-center justify-center">
          <OtherWeather class="mr-2" />
          <CommonSwitch v-model="enabled" />
        </div>
      </div>
    </header>
    <slot />
  </main>
</template>
<style scoped>
.header-border::after {
  background: linear-gradient(270deg, #5822f6 0%, #bf8dff 100%);
  background-size: 400% 400%;
  animation: gradient 8s ease infinite;
  content: "";
  @apply h-[5px] w-full block absolute top-0;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 80% 30%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 80% 30%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
