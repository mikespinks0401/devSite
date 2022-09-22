<script setup lang="ts">
  const showNav = ref(false)

  function toggleMenu() {
    showNav.value = !showNav.value
  }

  const links = [
    {to: "Home", href: "/"},
    {to: "About", href: "/about"},
    {to: "Contact", href: "/contact"},
    {to: "Blog", href: "/blog"},

  ]
</script>

<template>
  <header>
    <div
      class="w-full relative flex justify-between p-4 items-center border-b-2 shadow-sm"
    >
      <nuxt-link to="/" data-cy="logo">
        <img class="w-7" src="assets/logo.png" alt="logo to home page" />
      </nuxt-link>
      <button
        @click="toggleMenu"
        aria-labelledby="show nav menu"
        data-cy="hamburger"
        :aria-expanded="showNav"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
    <div
      class="w-full bg-gray-100 border-b-2 transition-all"
      :class="showNav ? 'flex flex-col divide-x-2' : 'hidden'"
      data-cy="mobile menu"
    >
      <div class="flex justify-center p-4 gap-2">
        <div class="w-14 h-14 rounded-full overflow-clip relative flex items-center">
          <img class="h-auto w-full relative top-2 " src="/avatar.png" alt="headshot " />
        </div>
        <div class="flex flex-col justify-center">
          <p class="font-semibold text">Michael Spinks</p>
          <p class="text-sm ">Full-Stack Developer</p>
        </div>
      </div>
      <ul>
        <li v-for="(link, index) in links" :key="index">
          <NuxtLink :to="link.href">{{link.to}}</NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>