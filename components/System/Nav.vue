<scrypt setup lang="ts"></scrypt>
<template>
  <nav class="main-nav">
    <ol>
      <li>
        <div>Overview</div>
      </li>
      <li>
        <div>Fun Projects</div>
      </li>
      <li><div>Write Up</div></li>
      <li><div>Use</div></li>
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
.main-nav ol li {
  @apply text-gray-500 font-medium flex cursor-pointer h-12 relative;
}
.main-nav ol li div {
  @apply h-full flex items-center;
}
.main-nav ol li div:before,
.main-nav ol li div:after {
  content: "";
  @apply absolute w-0 h-[3px] bottom-0 bg-gpurple rounded-full;
}

.main-nav ol li div:before {
  @apply left-0;
}
.main-nav ol li div:after {
  @apply right-0 bg-gpurple;
  transition: width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.main-nav ol li div:hover:before {
  @apply bg-gpurple w-full;
  transition: width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.main-nav ol li div:hover:after {
  @apply bg-transparent w-full;
  transition: 0s;
}
</style>
