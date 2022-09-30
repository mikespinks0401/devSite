<script setup lang="ts">
  const props = defineProps({
    name: String,
  })
  const titles = [
    'Thinker',
    'Creator',
    'Problem Solver',
    'Front End Developer',
    'Back End Developer',
    'Full Stack Developer',
  ]
</script>

<template>
  <div class="flex-1 flex flex-col w-full overflow-hidden" data-cy="hero">
    <div
      class="flex-1 w-full container max-w-6xl mx-auto grid md:grid-cols-2 p-4 md:px-2"
    >
      <div
        data-cy="hero-left"
        class="flex flex-col justify-center gap-2 md:p-4 tracking-widest"
      >
        <h1 class="text-3xl font-regular text-gray-800 dark:text-gray-100">
          <span class="">Hello,</span>
          My Name is
          <span
            class="text-primaryAccent text-5xl font-bold text block md:inline-block"
            >{{ props.name }}</span
          >
        </h1>
        <p class="text-3xl -m-1">
          I am a
          <span class="block text-4xl font-semibold md:inline-block">
            <homepage-text-writer
              :titles="titles"
              :loop="false"
              :timeToStart="800"
              :pauseTime="900"
            />
          </span>
        </p>
        <div class="leading-none">
          <p class="text-lg opacity-80">
            I build fast, secure, and user friendly apps
          </p>
          <p class="text-lg opacity-80">Have something in mind?</p>
        </div>
        <div class="mt-6">
          <nuxt-link
            to="/contact"
            class="px-4 p-2 bg-primaryAccent2 hover:bg-opacity-90 text-white text-lg font-medium"
            >Get In Touch</nuxt-link
          >
        </div>
      </div>
      <div class="flex flex-col w-full" data-cy="hero-right">
        <div
          class="bg-gradient-radial from-primaryAccent via-inherit w-full h-full"
        >
          <div class="relative">
            <img
              class="relative top-15 left-20"
              src="/heroImg.png"
              alt="Michael Spinks Hero image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
