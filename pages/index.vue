<script setup lang="ts">
const authStore = useAuthStore()

</script>

<template>
    <div class="">
        homePage - {{authStore.name}}
        hello
    </div>
</template>