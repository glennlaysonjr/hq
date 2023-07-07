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
<style scoped lang="scss">
.about {
  background-image: url();
}

.syntax {
  position: absolute;
}

@for $i from 1 through 30 {
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
      (random(80) * 1vh),
      (random(60) * 1px)
    );
    $size: random(20) + 8 + px;
    font-size: $size;
  }
}
</style>
