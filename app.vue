<script setup lang="ts">


const store = useAuthStore();


onServerPrefetch(async () => {
  //insert logic to fetch data before app renders
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
