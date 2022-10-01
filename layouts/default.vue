<script setup lang="ts">
  const navBarOpen = ref(false)
  const mobileMenuHeight = ref(0)
  const floatingDivHeight = ref(0)
  const bodyMarginTopClass = computed(() => {
    return navBarOpen.value === true ? ' ' : 'mt-10 md:mt-12'
  })

  function getMenuHeight(v: number): void {
    mobileMenuHeight.value = v
  }
  function createMenuSpace() {
    if (floatingDivHeight.value === 0) {
      floatingDivHeight.value = mobileMenuHeight.value
    }
  }

  function removeMenuSpace() {
    if (floatingDivHeight.value > 0) {
      floatingDivHeight.value = 0
    }
  }
</script>

<template>
  <div class="flex flex-col min-h-screen w-full relative">
    <div id="modal"></div>

    <div
      aria-hidden="true"
      class="z-0 bg-transparent"
      :style="{ height: `${floatingDivHeight}px` }"
    ></div>

    <the-header
      @send-menu-height="getMenuHeight"
      @menu-open="createMenuSpace"
      @menu-close="removeMenuSpace"
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
