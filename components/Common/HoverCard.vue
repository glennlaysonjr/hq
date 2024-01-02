<script setup lang="ts">
import {
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
    <HoverCardTrigger class="cursor-pointer">
      <slot />
    </HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent
        :side-offset="5"
        class="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade rounded-lg shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
      >
        <slot name="content" />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
