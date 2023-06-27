<script setup lang="ts"></script>
<template>
  <div>
    <CommonCodeEditor
      :languages="[
        ['javascript', 'JS'],
        ['typescript', 'TS'],
      ]"
      :line-nums="true"
      font-size="14px"
    ></CommonCodeEditor>
  </div>
</template>
