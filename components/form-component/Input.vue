<script setup lang="ts">
const emits = defineEmits(['updateText'])
const props = defineProps<{
  fieldName: string
  ariaLabel?: string
  inputType: string
  inputClasses?: string
  required?: boolean
  clearData?: boolean
}>()
const input = ref(null)
const textValue = ref('')
const isFocused = ref(false)
const hasTyped = ref(false)

watch(()=>props.clearData, ()=>{
textValue.value = ''
})


const placeholderText = computed(() => {
  return `Input your ${props.fieldName}`
})

const focusedClassStyles = computed(() => {
  return textValue.value !== '' || isFocused.value === true
    ? 'text-[0.5rem] translate-y-0  translate-x-1'
    : 'left-0 translate-y-2 translate-x-3'
})

const focusInput = () => {
  isFocused.value = true
  setTimeout(() => {
    input.value.focus()
  }, 150)
}

const stateChanged = () => {
  if(hasTyped.value === false){
    hasTyped.value = true
  }
}

</script>

<template>
  <div class="relative">
    <label
      @click="focusInput"
      for="name"
      class="absolute text-gray-700 transition duration-300 block cursor text z-0 cursor-text"
      :class="focusedClassStyles"
    >{{ props.fieldName }}
      <span
        v-if="props.required"
        class="text-red-600"
      >*</span>
    </label>
    <input
      ref="input"
      @blur="isFocused = false"
      @focus="isFocused = true"
      @input="emits('updateText', textValue), (isFocused = true)"
      @keyup="stateChanged"
      class="w-full ring-0 dark:text-black z-50 focus:border focus:border-primaryAccent2 "
      :class="props.inputClasses"
      :style="hasTyped === true ? 'border: red-200 ' : ''"
      :type="props.inputType"
      :name="props.fieldName"
      :aria-label="props.ariaLabel"
      v-model="textValue"
      :aria-placeholder="placeholderText"
    />
  </div>
</template>

<style>

</style>
