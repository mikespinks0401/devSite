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
  <div class="w-full " data-cy="hero">
    <div class="max-w-7xl mx-auto grid md:grid-cols-2">
      <div
        class=" dark:border-color-white border-color-black h-96 flex flex-col justify-center gap-1 p-4 tracking-widest"
        data-cy="hero-left"
      >
        <h1 class="text-4xl leading-tight font-medium mt-4">
          <span class="text-7xl font">Hello,</span><br />
          My Name is
          <span class="text-primaryAccent font-bold text block md:inline-block">{{
            props.name
          }}</span>
        </h1>
        <p class="text-3xl">
          I am a 
          <span class="font-semibold block md:inline-block">
            <homepage-text-writer :titles="titles" :loop='false'/>
          </span>
        </p>
        <div class="mt-4">
        <nuxt-link to="/contact" class="px-4 p-2 bg-primaryAccent2 hover:bg-opacity-90 text-white text-lg font-medium">Get In Touch</nuxt-link>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
