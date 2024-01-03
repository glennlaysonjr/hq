<script setup lang="ts">
import { useElementSize } from "@vueuse/core";

const highlights = ref([
  {
    syntax: "Vue",
    primary: true,
  },
  {
    syntax: "Nuxt",
    primary: true,
  },
  {
    syntax: "Tailwind",
    primary: true,
  },
  {
    syntax: "Javascrypt",
    primary: false,
  },
  {
    syntax: "Laravel",
    primary: false,
  },
  {
    syntax: "Prisma",
    primary: true,
  },
  {
    syntax: "MySQL",
    primary: false,
  },
  {
    syntax: "NestJS",
    primary: false,
  },
  {
    syntax: "PostgreSQL",
    primary: false,
  },
  {
    syntax: "PHP",
    primary: false,
  },
  {
    syntax: "MySQL",
    primary: false,
  },
  {
    syntax: "GraphQL",
    primary: false,
  },
  {
    syntax: "Figma",
    primary: true,
  },
  {
    syntax: "Photoshop",
    primary: false,
  },
  {
    syntax: "Illustrator",
    primary: false,
  },
  {
    syntax: "InDesign",
    primary: false,
  },
  {
    syntax: "TypeScript",
    primary: false,
  },
  {
    syntax: "Ubuntu",
    primary: false,
  },
  {
    syntax: "Docker",
    primary: false,
  },
  {
    syntax: "Netlify",
    primary: false,
  },
  {
    syntax: "Vercel",
    primary: false,
  },
]);

const heroRef = ref(null);
const syntaxDivs = ref([]);
const tRef = ref(null);

const { width, height } = useElementSize(heroRef);

const handleMouseMove = (event) => {
  const heroDiv = heroRef.value;
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const centerX = heroDiv?.offsetWidth / 2;
  const centerY = heroDiv?.offsetHeight / 2;

  const deltaX = (centerX - mouseX) * 0.05;
  const deltaY = (centerY - mouseY) * 0.05;
  tRef.value.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
};
</script>
<template>
  <NuxtLayout name="default">
    <section>
      <article
        @mousemove="handleMouseMove"
        class="flex flex-col items-center relative justify-center min-h-[calc(100vh-65px)]"
      >
        <div class="z-0 text-center" style="text-shadow: 3px -3px 50px #bbb2f3">
          <h1 class="font-bold tracking-[-8px] sm:text-[100px] text-[#1B006B]">
            Well hey there!
          </h1>
          <h4>I’m Glenn Layson a full stack web developer & ux/ui designer.</h4>
        </div>
        <div
          class="absolute top-0 blur-[.09rem] -z-10 w-full h-[800px] opacity-20"
          ref="heroRef"
        >
          <div class="relative flex gap-3" v-if="width > 0" ref="tRef">
            <div
              v-for="(highlight, index) in highlights"
              :key="index"
              ref="syntaxDivs"
              class="relative syntax text-primary"
              :class="highlight.primary ? '!text-3xl' : ''"
            >
              {{ highlight.syntax }}
            </div>
          </div>
        </div>
      </article>
      <article class="relative flex gap-3 about">
        <article class="flex gap-5 max-w-[1200px] mx-auto">
          <div
            class="flex flex-col items-center justify-center min-w-[300px] gap-2 px-4 rounded-lg mb-4 sm:flex-row bg-[#140344]"
          >
            <img
              src="@/assets/media/img/gl-memoji-1.svg"
              alt="Glenn Layson"
              class="aspect-square"
            />
          </div>
          <div
            class="bg-white rounded-lg shadow-[0px_11px_50px_-15px_#E2E0F4] p-8"
          >
            <h2 class="mb-8 font-bold">About Me.</h2>
            <p class="mb-2">
              I'm Glenn Layson, a 33-year-old principle engineer at TechOne
              Plus. I'm a weird guy who likes making weird things with web
              technologies.
            </p>
            <p class="mb-2">
              I like to resolve design problems, working on open source
              projects, create smart user interface and imagine useful
              interaction, developing rich web experiences & web applications.
            </p>
            <p class="mb-2">
              When not working or futzing around with code or figma, I practice
              martial arts and hang with my wife and german shepard
            </p>
            <OtherSocial />
          </div>
        </article>
      </article>
    </section>
    <div class="h-[300px] w-full"></div>
  </NuxtLayout>
</template>
<style scoped lang="scss">
/* Hero Animation */
.syntax {
  position: absolute;
}

@for $i from 1 through 35 {
  @keyframes particle-animation-#{$i} {
    0% {
      transform: translate3d(
        (random(80) * 1vw),
        (random(80) * 1vh),
        (random(100) * 1px)
      );
      opacity: 0;
    }
    3% {
      opacity: 1;
    }
    98% {
      opacity: 1;
    }
    100% {
      transform: translate3d(
        (random(80) * 1vw),
        (random(80) * 1vh),
        (random(100) * 1px)
      );
      opacity: 0;
    }
  }

  .syntax:nth-child(#{$i}) {
    animation-delay: -$i * 0.1s;
    animation: particle-animation-#{$i} 120s infinite;
    transform: translate3d(
      (random(80) * 1vw),
      (random(85) * 1vh),
      (random(60) * 1px)
    );
    $size: random(20) + 8 + px;
    font-size: $size;
  }
}
</style>
