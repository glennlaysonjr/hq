<script setup lang="ts">
import { useElementSize } from "@vueuse/core";

const strings = ref([
  "Vue",
  "Nuxt",
  "Javascript",
  "Laravel",
  "PHP",
  "NestJS",
  "Prisma",
  "Tailwind",
  "NodeJS",
  "MySQL",
  "PostgreSQL",
  "GraphQL",
  "Figma",
  "Photoshop",
  "Illustrator",
  "InDesign",
  "TypeScript",
  "Ubuntu",
  "Docker",
  "Netlify",
  "Vercel",
]);

const parentRef = ref(null);
const childDivs = ref([]);
const tRef = ref(null);

const { width, height } = useElementSize(parentRef);

const handleMouseMove = (event) => {
  const parentDiv = parentRef.value;
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const centerX = parentDiv.offsetWidth / 2;
  const centerY = parentDiv.offsetHeight / 2;

  const deltaX = (centerX - mouseX) * 0.05;
  const deltaY = (centerY - mouseY) * 0.05;
  tRef.value.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
};

// function that will anamate location of child divs
</script>
<template>
  <section>
    <article
      @mousemove="handleMouseMove"
      class="flex flex-col items-center relative justify-center min-h-[calc(100vh-65px)]"
    >
      <div class="z-0 text-center" style="text-shadow: 3px -3px 50px #bbb2f3">
        <h1>Well hey there!</h1>
        <h4>I’m Glenn Layson a full stack web developer & ux/ui designer.</h4>
      </div>
      <div
        class="absolute blur-[.09rem] -z-10 w-full h-[800px] perspective-[100%] opacity-20"
        ref="parentRef"
      >
        <div class="relative" ref="tRef">
          <div
            v-for="string in strings"
            :key="string"
            ref="childDivs"
            class="duration-700 ease-in-out opacity-0 child text-primary"
            :style="{
              top: `${Math.floor(Math.random() * (height + Math.random()))}px`,
              left: `${Math.floor(Math.random() * (width + Math.random()))}px`,
              fontSize: `${Math.floor(Math.random() * 20) + 10}px`,
              opacity: 1,
            }"
          >
            {{ string }}
          </div>
        </div>
      </div>
    </article>
    <article class="relative flex gap-3 about">
      <div class="absolute top-0 -z-20 opacity-5 left-20">
        <SystemLogo class="w-[325px]" />
      </div>
      <aside>
        <img
          src="@/assets/media/img/gl-memoji-1.png"
          alt="Glenn Layson"
          class="w-[300px] hidden md:block"
        />
      </aside>
      <article>
        <div class="flex flex-col items-center gap-2 mb-4 sm:flex-row">
          <img
            src="@/assets/media/img/gl-memoji-1.png"
            alt="Glenn Layson"
            class="sm:w-[140px] w-[200px] block md:hidden"
          />
          <h2>About Me.</h2>
        </div>
        <p class="mb-2 font-medium">
          Welcome and thank for taking the time to find out more about me. Here
          is a few things that define who I am as a person and worker.
        </p>
        <ul class="mb-4 ml-12 list-disc">
          <li>Full Stack Developer 🖥 for over 14 years</li>
          <li>Graphic Designer Print and Digital 👨‍💻 for over 14 years</li>
          <li>IT & Network Specialist 🤓 For the last 8 years</li>
          <li>
            Cancer Warrior🎗 In remission from battling Hodgkins Lymphoma. This
            experience will forever have changed my life and has made me even
            stronger for it!
          </li>
          <li>
            Martial Artist 🥋 Have been an avid student of the martial arts for
            the last 24 years! 3rd degree black belt in 4 styles of martial arts
            (Isshin-Ryū Karate, Judo, Brazilian Jujitsu, Tae Kwon Do). I have
            had the greatest opportunity to teach those martial arts for over 8
            years
          </li>
        </ul>
        <p class="mb-2 font-medium">
          Some other fun things things that define who I am and what makes me
          who I am today:
        </p>
        <ul class="ml-12 list-disc">
          <li>
            Married to the love of my life and best friend in the world 🤵‍♂️👰‍♀️
          </li>
          <li>
            Enjoyed tutoring and running after school clubs in public schools
            for 4 years 👨‍🏫
          </li>
          <li>Went to college for small business 🎓</li>

          <li>Taught graphic and web design at that college for 2 years 🏫</li>
          <li>Was homeschooled for all 12 years 🏡</li>
          <li>
            I am a big Star Wars & Harry Potter fan 🎬 Lego enthusiasts 🧱
          </li>
        </ul>
      </article>
    </article>
    <article>
      <OtherSocial />
    </article>
  </section>
</template>
<style scoped>
.about {
  background-image: url();
}

.child {
  position: absolute;
  top: 0;
  left: 0;
  transform-style: preserve-3d;
}
</style>
