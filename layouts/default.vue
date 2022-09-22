<script setup lang='ts'>

</script>

<template>
    <div class="flex flex-col min-h-screen w-full justify-between">
        <the-header class="flex-none"/>
        <slot class="flex-1" />
        <the-footer class="flex-none"/>

    </div>
</template>