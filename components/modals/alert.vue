<script setup lang="ts">
  const props = defineProps({
    title: String,
    buttonText: String
  })
  const emits = defineEmits(['closeModal'])
</script>

<template>
  <div class="">
    <div
      @click="emits('closeModal')"
      class="absolute bg-black bg-opacity-80 inset-0 z-10"
    ></div>
    <div class="absolute inset-0 flex flex-col items-center justify-center" aria-modal="true">
      <div class="w-full flex flex-col items-center md:min-w-max md:max-w-md   z-20 rounded-sm bg-white cursor-default">
        <div class="flex justify-center w-full border-b-2 border-gray-200">
          <p class="font-bold text-gray-800 py-2">{{props.title}}</p>
        </div>
        <div class="py-2">
          <slot />
          <div class="flex justify-center py-3 z-20">
            <button
              @click="emits('closeModal')"
              class="text-white px-4 py-1 bg-slate-600 cursor-pointer hover:bg-slate-500 text-semibold"
            >
              {{props.buttonText}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
