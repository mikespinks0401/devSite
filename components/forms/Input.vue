<script setup lang="ts">
  const emit = defineEmits(['updateText'])
  const props = defineProps({
    fieldName: String,
    ariaLabel: String,
    type: String,
    classes: String,
    required: {
      type: Boolean,
      default: false,
    },
  })
  const textValue = ref('')
  const isFocused = ref(false)

  const placeholderText = computed(() => {
    return `Input your ${props.fieldName}`
  })

  const focusedClassStyles = computed(() => {
    return textValue.value !== '' || isFocused.value === true
      ? 'text-[0.5rem] translate-y-0  translate-x-1'
      : 'left-0 translate-y-2 translate-x-3'
  })
</script>

<template>
  <div class="relative">
    <label
      for="name"
      class="absolute text-gray-700 transition duration-300 block"
      :class="focusedClassStyles"
      >{{ props.fieldName
      }}<span v-if="props.required" class="text-red-600">*</span></label
    >
    <input
      @blur="isFocused = false"
      @focus="isFocused = true"
      @input="emit('updateText', textValue), (isFocused = true)"
      class="w-full focus:ring-0 dark:text-black"
      :class="props.classes"
      :type="props.type"
      :name="props.fieldName"
      :aria-label="props.ariaLabel"
      v-model="textValue"
      :aria-placeholder="placeholderText"
    />
  </div>
</template>

<style></style>
