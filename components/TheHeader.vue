<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const themeStore = useThemeStore()
  const loggedIn = ref(false)
  const showNav = ref(false)

  const links = [
    { to: 'Home', href: '/' },
    { to: 'Blog', href: '/blog' },
    { to: 'About', href: '/about' },
    { to: 'Contact', href: '/contact' },
  ]

  function closeMenu() {
    showNav.value = false
  }
  function toggleMenu() {
    showNav.value = !showNav.value
  }

  onMounted(() => {
    window.addEventListener('resize', () => {
      showNav.value = false
    })
  })
</script>

<template>
  <header
    data-cy="header"
    class="w-full shadow-sm md:shadow-none z-30 fixed md:border-b bg-white dark:md:border-b-gray-500 dark:bg-black dark:text-white transition-all"
  >
    <div
      class="w-full container relative flex justify-between md:justify-start items-center max-w-7xl md:mx-auto md:px-2 border-b dark:border-b-gray-500 md:border-none"
    >
      <div class="px-3 pt-1 md:pt-0 flex-1">
        <div class="inline-block">
          <nuxt-link
            @click="closeMenu"
            to="/"
            data-cy="logo"
            class="flex items-end relative"
          >
            <img class="w-8" src="../assets/logo.png" alt="Go to home page" />
            <p
              class="pl-2 text-2xl tracking-widest relative top-0 hidden md:block text-primaryText dark:text-primaryTextDark"
            >
              Mike<span class="text-primaryAccent">Spinks</span>
            </p>
          </nuxt-link>
        </div>
      </div>
      <div class="hidden md:flex flex-1 justify-center">
        <nav>
          <ul class="flex gap-6 items-center">
            <li v-for="(item, ind) in links" :key="ind" class="overflow-hidden">
              <div>
                <nuxt-link
                  class="block py-[10px] border-b-2 border-primaryAccent border-opacity-0 text-lg hover:text-gray-500 bg-opacity-75 dark:text-gray-300 dark:hover:text-white font-medium hover:opacity-100 transition"
                  :to="item.href"
                  >{{ item.to }}</nuxt-link
                >
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div
        class="hidden md:flex flex-1 justify-end items-center gap-4 font-medium pr-3"
      >
        <nuxt-link
          to="/login"
          class="auth font-semibold dark:text-gray-100 dark:hover:text-gray-50"
          >Login</nuxt-link
        >
        <nuxt-link
          class=" auth px-4 py-1 bg-primaryAccent2 text-white transition font-semibold hover:bg-opacity-90"
          to="/register"
          >Sign Up</nuxt-link
        >
        <nuxt-link
          to="https://github.com/mikespinks0401"
          aria-label="Go to Michael Spinks Github Profile"
          class="cursor-pointer"
          target="_blank"
        >
          <logos-github />
        </nuxt-link>
        <button
          @click="themeStore.changeLightMode"
          class="cursor-pointer hidden md:block text-gray-700 dark:text-gray-400 dark:hover:text-gray-100 hover:text-gray-900"
          aria-label="Toggle Light Mode"
        >
          <div v-if="themeStore.isLightMode" aria-label="Turn ON Dark Mode">
            <icons-moon />
          </div>
          <div v-else aria-label="Turn On Light Mode"><icons-sun /></div>
        </button>
      </div>

      <div class="flex h-full items-center gap-1 md:hidden">
        <div class="flex items-center">
          <button
            @click="themeStore.changeLightMode"
            class="cursor-pointer text-gray-700 dark:text-gray-400 dark:hover:text-white hover:text-gray-900"
            aria-label="Toggle Light Mode"
          >
            <div v-if="themeStore.isLightMode" aria-label="Turn On Dark Mode">
              <icons-moon />
            </div>
            <div v-else aria-label="Turn On Light Mode"><icons-sun /></div>
          </button>
        </div>
        <button
          @click.native="toggleMenu"
          aria-label="toggle nav menu"
          class="md:hidden px-3 py-2"
          data-cy="hamburger"
          :aria-expanded="showNav"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 -z-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </div>
    <div
      @click=""
      class="transition w-full overflow-hidden"
      :class="
        showNav
          ? 'max-h-full ring-1 ring-gray-200 dark:ring-gray-500 dark:md:border-b-gray-500'
          : 'max-h-0'
      "
      data-cy="mobile menu"
    >
      <div
        class="flex flex-col w-full relative transition duration-500 p-4 dark:bg-gray-800"
        :class="showNav ? 'translate-y-0' : '-translate-y-full'"
      >
        <div class="flex justify-center p-4 gap-2">
          <div
            class="w-14 h-14 rounded-full overflow-clip relative flex items-center"
          >
            <img
              class="h-auto w-full relative top-2"
              src="/avatar.png"
              alt="headshot "
            />
          </div>
          <div class="flex flex-col justify-center">
            <p class="font-semibold text">Michael Spinks</p>
            <p class="text-sm">Full-Stack Developer</p>
          </div>
        </div>
        <nav class="md:hidden">
          <ul class="divide-y" data-cy="navList">
            <li v-for="(link, index) in links" :key="index">
              <div class="flex w-full py-1 overflow-hidden">
                <NuxtLink
                  @click="closeMenu"
                  class="font-medium opacity-100 hover:opacity-50 dark:opacity-70 dark:hover:opacity-100 transition duration-75"
                  :to="link.href"
                  >{{ link.to }}</NuxtLink
                >
              </div>
            </li>
          </ul>
          <div
            v-if="!loggedIn"
            class="w-full flex flex-col items-center gap-2 divide-y font-medium"
          >
            <nuxt-link to="/login">Login</nuxt-link>
            <nuxt-link class="bg-blue-200 px-4 py-1 rounded-full" to="/register"
              >Sign Up</nuxt-link
            >
          </div>
          <div
            v-else
            class="mt-6 w-full flex flex-col bg-green-100 items-center justify-center"
          >
            <nuxt-link to="/profile" class="flex gap-1"
              >Profile
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
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </nuxt-link>
            <button class="flex flex-row-reverse gap-1">
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Log Out
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
  
  ul > li > div > .router-link-active {
    @apply border-opacity-100
  }
  .router-link-exact-active:not(.auth) {
    color: rgb(32, 178, 170);
  }
  .router-link-exact-active:hover:not(.auth) {
    color: rgb(32, 178, 170);
  }
</style>