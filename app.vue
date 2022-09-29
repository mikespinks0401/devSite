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
