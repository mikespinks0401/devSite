<script setup lang="ts">
  const authStore = useAuthStore()
  const themeStore = useThemeStore()
  const showDark = ref('')
  const loading = ref(true)
  const splashClass = ref("")

  

//shows splash screen while loading user info
  onMounted(async() => {
    try{
      await themeStore.init()
      await authStore.init()
    }catch(err){
      console.log(err)
    } finally{
      loading.value = false
      setTimeout(() => {
        splashClass.value = "hidden"
      }, 600)
    }
  })

</script>

<template>
  <div>
    
    <div class="fixed top-1/2 right-1/2" :class=splashClass>
      <splash />
    </div>
    <div class="transition-all duration-200" :style="loading === true ? 'opacity: 0;' : 'opacity: 100;' " :class="themeStore.isLightMode === true ? '' : 'dark'">
      <div >
        <NuxtLayout>
          <NuxtLoadingIndicator />
        <NuxtPage />
      </NuxtLayout>
      </div>
    </div>
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
