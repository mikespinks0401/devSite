<script setup lang="ts">
  const props = defineProps({
    name: String,
  })
  const titles = [
    'Thinker',
    'Problem Solver',
    'Front End Developer',
    'Back End Developer',
    'Full Stack Developer',
  ]
</script>

<template>
  <div class="w-full" data-cy="hero">
    <div class="max-w-7xl mx-auto grid md:grid-cols-2 min-h-max">
      <div
        class=" dark:border-color-white border-color-black h-96 flex flex-col justify-center p-4"
        data-cy="hero-left"
      >
        <h1 class="text-4xl leading-tight font-medium">
          <span class="text-7xl font">Hello,</span><br />
          My Name is
          <span class="text-primaryAccent font-bold text">{{
            props.name
          }}</span>
        </h1>
        <p class="text-3xl">
          I am a <span class="font-semibold"><homepage-text-writer :titles="titles" :loop='false'/></span>
        </p>
        <div></div>
      </div>
    </div>
  </div>
</template>
