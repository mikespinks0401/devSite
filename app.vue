<script setup lang="ts">

  
  const authStore = useAuthStore()
  const themeStore = useThemeStore()
  const isDarkMode = computed(()=>{
    return themeStore.isLightMode === true ? "" : "dark"
  })

onServerPrefetch(async () => {
  //insert logic to fetch data before app renders
})
</script>

<template>
  <div :class="isDarkMode">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
