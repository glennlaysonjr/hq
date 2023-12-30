<script setup lang="ts">
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
} from "radix-vue";
import { ref } from "vue";

const hoverState = ref(false);
</script>

<template>
  <HoverCardRoot v-model:open="hoverState">
    <HoverCardTrigger
      class="inline-block cursor-pointer rounded-full shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]"
      rel="noreferrer noopener"
    >
      <slot />
    </HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent
        class="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
        :side-offset="5"
      >
        <div class="flex flex-col gap-[7px]">
          <slot name="card-content" />
        </div>

        <HoverCardArrow class="fill-white" size="8" />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
