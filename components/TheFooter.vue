<script setup lang="ts">
  const logos = [
    { logoFor: 'My Github Profile', src: '', svgSrc: '/logos/linkedIn.svg' },
    { logoFor: 'My LinkedIn Profile', src: '', svgSrc: '/logos/github.svg' },
  ]
  const copyright = computed(() => {
    const date = new Date()
    return `© ${date.getFullYear()} MikeSpinks.com`
  })
</script>

<template>
  <div
    data-cy="Footer"
    class="py-3 w-full border-t dark:border-t-gray-500 dark:bg-black dark:text-white transition"
  >
    <div class="container max-w-7xl mx-auto h-full">
      <div class="flex flex-col gap-1 h-full items-center justify-between">
        <div class="px-2 flex h-full justify-center items-center gap-2">
          <nuxt-link
            to="https://github.com/mikespinks0401"
            aria-describedby="link to Github profile"
            target="_blank"
          >
            <logos-github :size="20" />
          </nuxt-link>
          <nuxt-link
            to="https://www.linkedin.com/in/michael-spinks-254879201"
            alt="Go To My Linked In Profile"
            aria-describedby="link to linkedIn profile"
            target="_blank"
          >
            <logos-linked-in :size="20" />
          </nuxt-link>
        </div>
        <div>
          {{ copyright }}
        </div>
      </div>
    </div>
  </div>
</template>
