<script setup lang="ts">
  const logos = [
    { logoFor: 'My Github Profile', src: '', svgSrc: '/logos/linkedIn.svg' },
    { logoFor: 'My LinkedIn Profile', src: '', svgSrc: '/logos/github.svg' },
  ]
  const copyright = computed(() => {
    const date = new Date()
    return `© ${date.getFullYear()} MikeSpinks.dev`
  })
</script>

<template>
  <div data-cy="Footer" class="p-3 w-full border-t">
    <div class="container max-w-7xl mx-auto h-full">
      <div
        class="flex flex-col gap-2 h-full items-center justify-between"
      >
        <div class="px-2 flex h-full justify-center items-center gap-1">
          <nuxt-link
            to="https://github.com/mikespinks0401"
            alt="Go To My Github Profile"
            aria-describedby="link to Github profile"
          >
            <logos-github :size="20" />
          </nuxt-link>
          <nuxt-link
            to="https://www.linkedin.com/in/michael-spinks-254879201"
            alt="Go To My Linked In Profile"
            aria-describedby="link to linkedIn profile"
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
