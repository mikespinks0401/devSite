<script setup lang="ts"></script>

<template>
  <div class="flex flex-col min-h-screen w-full relative">
    <div id="modal"></div>
    <the-header />
    <div
      class="mt-10 md:mt-12 flex flex-col flex-1 bg-slate-50 dark:bg-gray-900 dark:text-gray-100 transition"
    >
      <slot />
    </div>
    <the-footer />
  </div>
</template>
