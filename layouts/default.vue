<script setup lang="ts"></script>

<template>
  <div class="flex flex-col min-h-screen w-full">
    <the-header />
    <div class="flex-1 dark:bg-gray-900 dark:text-gray-100 transition">
      <slot/>
    </div>
    <the-footer />
  </div>
</template>