<script setup lang="ts">
  const props = defineProps({
    name: String,
    heroImgUrl: String,
  })
  const titles = [
    'Thinker',
    'Creator',
    'Problem Solver',
    'Front End Developer',
    'Back End Developer',
    'Full Stack Developer',
  ]

  console.log(props.heroImgUrl)
</script>

<template>
  <div
    class="flex-1 flex flex-col w-full justify-center max-h-full"
    data-cy="hero"
  >
    <div
      class="w-full flex-1 container max-w-6xl mx-auto grid md:grid-cols-2 md:px-2"
    >
      <!--Left Side Of Hero-->
      <div
        data-cy="hero-left"
        class="order-2 md:order-1 py-12 h-full flex flex-col justify-center gap-2 md:p-4 lg:p-0 tracking-widest text-center md:text-left"
      >
        <h1
          class="text-2xl md:text-3xl font-regular text-gray-800 dark:text-gray-100"
        >
          <span class="">Hello,</span>
          My Name is
          <span
            class="text-primaryAccent text-4xl md:text-5xl font-bold block md:inline-block"
            >{{ props.name }}</span
          >
        </h1>
        <p class="text-3xl">
          I am a
          <span
            class="block text-3xl font-black md:text-4xl md:font-semibold md:inline-block"
          >
            <!--Custom Text Writer Component-->
            <homepage-text-writer
              :titles="titles"
              :loop="false"
              :timeToStart="800"
              :pauseTime="900"
            />
          </span>
        </p>
        <div class="leading-none">
          <p class="text-lg">
            I build fast, secure, and user friendly web apps.
          </p>
          <p class="text-lg o">Have something in mind?</p>
        </div>
        <div class="my-6">
          <nuxt-link
            to="/contact"
            class="px-4 p-2 bg-primaryAccent2 hover:bg-opacity-90 text-white text-lg font-semibold"
            >Get In Touch</nuxt-link
          >
        </div>
      </div>
      <!-- RIght Side of Hero-->
      <div class="w-full flex flex-col order-1 md:order-2" data-cy="hero-right">
        <div
          class="h-full w-full flex-1 flex flex-col justify-center items-center -mt-4 bg-primaryAccent2 dark:bg-primaryAccentDark transition-all overflow-hidden md:mt-0"
        >
          <div
            class="h-72 w-full relative bg-contain bg-center bg-no-repeat md:right-4 md:h-full md:-bottom-8"
            :style="{ backgroundImage: `url(${heroImgUrl})` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
