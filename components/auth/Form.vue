<script setup lang="ts">
  const props = defineProps<{
    handleSubmit: Function
  }>()
  const emits = defineEmits(['error'])
  const email = ref('')
  const password = ref('')

  function submitForm() {
    props.handleSubmit()
  }
</script>

<template>
  <div class="z-40">
    <form @submit.prevent="submitForm" data-cy="auth form">
      <forms-input field-name="email" inputType="string" />
      <forms-input field-name="password" inputType="string" />
      <forms-input field-name="passwordConfirm" inputType="string" />
      <input
        data-cy="formSubmit"
        class="cursor-pointer"
        type="submit"
        aria-label="submit registration"
        value="Register Now"
      />
    </form>
  </div>
</template>
