<script setup lang="ts">
const route = useRoute();
</script>
<template>
  <nav class="main-nav">
    <ol>
      <li>
        <NuxtLink to="/">
          <div>Home</div>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/projects"
          :class="route.path.includes('/projects') ? 'active' : ''"
        >
          <div>Projects</div>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/write-ups"
          :class="route.path.includes('/write-ups') ? 'active' : ''"
        >
          <div>Write Ups</div>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/uses"
          :class="route.path.includes('/uses') ? 'active' : ''"
        >
          <div>Uses</div>
        </NuxtLink>
      </li>
    </ol>
  </nav>
</template>
<style scoped>
.main-nav {
  @apply flex items-center justify-between;
}
.main-nav ol {
  @apply flex flex-row gap-5 relative;
}
.main-nav ol li a {
  @apply text-gray-500  font-medium tracking-tight flex h-12 relative hover:text-gpurple transition-all ease-in-out duration-500;
}
.main-nav ol li a.active {
  @apply text-gpurple;
}
.main-nav ol li a.active div:before {
  @apply bg-gpurple w-full;
}
.main-nav ol li a div {
  @apply !h-full flex items-center;
}
.main-nav ol li a div:before,
.main-nav ol li a div:after {
  content: "";
  @apply absolute w-0 h-[3px] bottom-0 bg-gpurple rounded-full;
}

.main-nav ol li a div:before {
  @apply left-0;
}
.main-nav ol li a div:after {
  @apply right-0 bg-gpurple;
  transition: width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.main-nav ol li a div:hover:before {
  @apply bg-gpurple w-full;
  transition: width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.main-nav ol li a div:hover:after {
  @apply bg-transparent w-full;
  transition: 0s;
}
</style>
