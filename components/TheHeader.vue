<script setup lang="ts">
  onMounted(() => {
    window.addEventListener('resize', () => {
      showNav.value = false
    })
  })
  const loggedIn = ref(false)
  const showNav = ref(false)

  function toggleMenu() {
    showNav.value = !showNav.value
  }

  const links = [
    { to: 'Home', href: '/' },
    { to: 'Blog', href: '/blog' },
    { to: 'About', href: '/about' },
    { to: 'Contact', href: '/contact' },
  ]
</script>

<template>
  <header
    data-cy="header"
    class="w-full shadow-sm md:shadow-none relative md:border-b"
  >
    <div
      class="w-full container relative flex justify-between items-center max-w-7xl md:mx-auto md:px-2 border-b md:border-none"
    >
      <div class="px-3 py-2">
        <div class="inline max-w-8">
          <nuxt-link to="/" data-cy="logo" class="">
            <img
              class="w-8"
              src="assets/logo.png"
              alt="logo links to home page"
            />
          </nuxt-link>
        </div>
      </div>
      <div class="hidden md:flex py-4">
        <nav>
          <ul class="flex gap-6 items-center">
            <li v-for="(item, ind) in links" :key="ind">
              <nuxt-link
                class="opacity-75 font-medium hover:opacity-100"
                :to="item.href"
                >{{ item.to }}</nuxt-link
              >
            </li>
          </ul>
        </nav>
      </div>
      <div class="hidden md:flex items-center gap-4 font-medium">
        <nuxt-link to="/login">Login</nuxt-link>
        <nuxt-link class="bg-blue-200 px-4 py-1 rounded-full" to="/register"
          >Sign Up</nuxt-link
        >
      </div>
      <button
        @click="toggleMenu"
        aria-labelledby="toggle nav menu"
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
      @click=""
      class="transition w-full overflow-hidden"
      :class="showNav ? 'max-h-full' : 'max-h-0'"
      data-cy="mobile menu"
    >
      <!-- <div
      class="relative transition overflow-hidden duration-800"
      :class="showNav ? ' max-h-auto' : 'max-h-0'"
      data-cy="mobile menu"
    > -->

      <div
        class="flex flex-col w-full relative transition duration-500 p-4"
        :class="showNav ? 'translate-y-0' : '-translate-y-full'"
      >
        <!-- <div
          class="w-full relative transition-all duration-500"
          :class="showNav ? '-translate-y-100' : 'translate-y-0'"
        >  -->
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
          <ul class="divide-y">
            <li v-for="(link, index) in links" :key="index">
              <div class="flex w-full py-1">
                <NuxtLink
                  class="font-medium opacity-100 hover:opacity-50 transition duration-75"
                  :to="link.href"
                  >{{ link.to }}</NuxtLink
                >
              </div>
            </li>
          </ul>
          <div
            v-if="loggedIn"
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
            <nuxt-link to="/profile"
            class="flex gap-1"
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
  ul > li > .router-link-active {
    color: lightseagreen;
  }
  ul > li > .router-link-exact-active {
    color: lightseagreen;
  }
</style>