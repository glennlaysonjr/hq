<script setup lang="ts">
import { useMouse } from "@vueuse/core";
import dayjs from "dayjs";

const currentYear = dayjs().format("YYYY");
const { x, y, sourceType } = useMouse();

const enabled = ref(false);
</script>
<template>
  <main
    class="h-screen bg-gradient-to-b from-[#E1DFF3] to-transparent to-70% sm:to-60% lg:40% w-full"
  >
    <header class="flex items-center justify-between w-full h-16 header-border">
      <div
        class="flex items-center justify-between w-full h-full px-4 pt-6 pb-4"
      >
        <div class="">
          <SystemLogo class="mt-2 w-18" />
        </div>
        <div>
          <SystemNav />
        </div>
        <div class="flex items-center justify-center">
          <OtherWeather class="mr-2" />
        </div>
      </div>
    </header>
    <slot />
    <footer class="flex items-center justify-center w-full">
      <div class="flex flex-col items-center w-fit">
        <SystemLogo class="mt-2 w-8 text-[#1B006B]/70" />
        <p class="text-xs">© {{ currentYear }} Glenn Layson Jr</p>
      </div>
    </footer>
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
