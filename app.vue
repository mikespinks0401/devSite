<script setup lang="ts">
  const authStore = useAuthStore()
  const themeStore = useThemeStore()

  const loaded = ref(false)

  onBeforeMount(async () => {
    const isOn = await themeStore.init()
    if (isOn) {
      themeStore.$patch({ isLightMode: false })
    }
    loaded.value = true
  })
  const isDarkMode = computed(() => {
    return themeStore.isLightMode === true ? '' : 'dark'
  })
</script>

<template>
  <div v-if="loaded === true" :class="isDarkMode">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
  .page-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }

  .page-enter-active,
  .page-leave-active {
    transition: all 0.2s;
  }
  .page-enter,
  .page-leave-to {
    opacity: 0;
  }
</style>
