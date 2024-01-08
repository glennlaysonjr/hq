<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    align?: "start" | "center" | "end";
    avoidCollisions?: boolean;
    sideOffset?: number;
    side?: "top" | "right" | "bottom" | "left";
    click?: () => void;
  }>(),
  {
    align: "center",
    avoidCollisions: true,
    sideOffset: 15,
    side: "top",
  },
);
</script>
<template>
  <TooltipProvider :delay-duration="50">
    <TooltipRoot>
      <TooltipTrigger class="w-full">
        <slot />
      </TooltipTrigger>
      <TooltipContent
        :avoidCollisions="avoidCollisions"
        :collisionPadding="5"
        class="TooltipContent tooltippy"
        :side-offset="4"
        :side="side"
      >
        <slot name="content" />
      </TooltipContent>
    </TooltipRoot>
  </TooltipProvider>
</template>
<style>
.tooltippy {
  @apply text-[10px] font-semibold text-white bg-gpurple py-2 px-4  rounded-full shadow-input;
}
.TooltipContent {
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
.TooltipContent[data-side="top"] {
  animation-name: slideUp;
}
.TooltipContent[data-side="bottom"] {
  animation-name: slideDown;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
