<script setup lang="ts">
  const navBarOpen = ref(false)
  const bodyMarginTopClass = computed(() => {
    return navBarOpen.value === true ? ' ' : 'mt-10 md:mt-12'
  })
</script>

<template>
  <div class="flex flex-col min-h-screen w-full relative">
    <div id="modal"></div>
    <the-header />
    <div
      class="flex flex-col flex-1 bg-slate-50 dark:bg-gray-900 dark:text-gray-100 transition"
      :class="bodyMarginTopClass"
    >
      <slot />
    </div>
    <the-footer />
  </div>
</template>
<style>

</style>
