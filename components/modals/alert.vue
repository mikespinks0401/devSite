<script setup lang="ts">
interface Props {
  title: string,
  buttonText: string,
  buttonColor?: string
}

const props = withDefaults(defineProps<Props>(),{
  buttonColor: 'bg-slate-600 hover:bg-slate-500'
})
const emits = defineEmits(['closeModal'])
</script>

<template>
  <div class="">
    <div
      @click="emits('closeModal')"
      class="absolute bg-black bg-opacity-90 inset-0 z-40"
    ></div>
    <div
      class="absolute z-50 inset-0 flex flex-col items-center justify-center"
      aria-modal="true"
    >
      <!-- start card -->
      <div
        data-cy="modal"
        role="alert"
        class="w-full flex flex-col items-center md:min-w-max md:max-w-md z-20 rounded-sm bg-white cursor-default"
      >
        <div class="flex justify-center w-full border-b-2 border-gray-200">
          <p class="font-bold text-gray-800 py-2">{{props.title}}</p>
        </div>
        <div class="py-4 ">
          <slot />
        </div>
        <div class="border-2 w-full">

          <div class="flex justify-center py-3 z-20">
            <button
              data-cy="close-modal"
              @click="emits('closeModal')"
              class="text-white px-4 py-1 text-semibold"
              :class="props.buttonColor"
            >
              {{props.buttonText}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
