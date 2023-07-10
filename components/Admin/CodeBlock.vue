<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

const props = defineProps(nodeViewProps);

console.log(props);

const languages = props.extension.options.lowlight.listLanguages();

const selectedLanguage = computed({
  get() {
    return props.node.attrs.language;
  },
  set(language) {
    props.updateAttributes({ language });
  },
});
</script>

<template>
  <node-view-wrapper class="code-block">
    <!-- Change to formkit -->
    <select contenteditable="false" v-model="selectedLanguage">
      <option :value="null">auto</option>
      <option disabled>—</option>
      <option
        v-for="(language, index) in languages"
        :value="props.node.attrs.language"
        :key="index"
      >
        {{ language }}
      </option>
    </select>
    <pre><code><node-view-content /></code></pre>
  </node-view-wrapper>
</template>

<style lang="scss">
.code-block {
  position: relative;

  select {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>
