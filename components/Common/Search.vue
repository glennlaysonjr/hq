<script setup lang="ts">
const selectedValue = ref();

watch(
  () => selectedValue.value,
  () => {
    if (selectedValue.value) {
      navigateTo(`/write-ups/${selectedValue.value.data.slug}`);
    }
  },
);

const { $directus, $readItems } = useNuxtApp();

const groups = computed(() => {
  return [
    {
      key: "items",
      search: async (term: string) => {
        if (!term) {
          return [];
        }

        const items = await $directus.request(
          $readItems("write_ups", {
            filter: {
              status: {
                _eq: "published",
              },
            },
            search: term,
            fields: ["*"],
          }),
        );

        return items?.map((item) => {
          return {
            label: item.title,
            id: item.id,
            data: item,
          };
        });
      },
    },
  ].filter(Boolean);
});
</script>
<template>
  <div class="relative">
    <UCommandPalette
      placeholder="Search for articles and code snippets..."
      :groups="groups"
      v-model="selectedValue"
    >
      <template #empty-state> <div></div> </template>
    </UCommandPalette>
  </div>
</template>

<style scoped></style>
