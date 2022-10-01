<script setup lang="ts">
  const navBarOpen = ref(false)
  const mobileMenuHeight = ref(0)
  const floatingDivHeight = ref(0)
  const bodyMarginTopClass = computed(() => {
    return navBarOpen.value === true ? ' ' : 'mt-10 md:mt-12'
  })
  const useFloatingDivHeight = computed(() => {
    return navBarOpen.value === true
      ? `min-height: ${mobileMenuHeight.value + 38}px;`
      : `min-height: 0px;`
  })
  function getMenuHeight(v: number): void {
    mobileMenuHeight.value = v
  }
  function menuClosed() {
    console.log(useFloatingDivHeight.value)
    navBarOpen.value = false
  }

  function menuOpen() {
    console.log(mobileMenuHeight.value)
    console.log(useFloatingDivHeight.value)
    navBarOpen.value = true
  }
</script>

<template>
  <div class="flex flex-col min-h-screen w-full relative min-h">
    <div id="modal"></div>

    <div
      aria-hidden="true"
      class="z-0 bg-transparent"
      :style="useFloatingDivHeight"
    ></div>

    <the-header
      @send-menu-height="getMenuHeight"
      @menu-open="menuOpen"
      @menu-close="menuClosed"
      class="z-10"
    />
    <div
      class="z-0 flex flex-col flex-1 bg-slate-50 dark:bg-gray-900 dark:text-gray-100 transition"
      :class="bodyMarginTopClass"
    >
      <slot />
    </div>
    <the-footer />
  </div>
</template>
<style></style>
