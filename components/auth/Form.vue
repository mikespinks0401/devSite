<script setup lang="ts">
const props = defineProps<{
  handleSubmit?: Function
}>()
const emits = defineEmits(['error']['sendFormData'])

const userData = reactive({
  email: '',
  password: '',
  passwordConfirm: ''
})

const updateEmail = (v) => {
  console.log(userData.email)
  userData.email = v
}
const updatePassword = (v) => {
  userData.password = v
}
const updatePasswordConfirm = (v) => {
  userData.passwordConfirm = v
}
const submitForm = () => {
  emits('sendFormData', userData)
}
</script>

<template>
  <div class="z-40">
    <form
      @submit.prevent="submitForm"
      data-cy="auth form"
    >
      <form-component-input
        @update-text="updateEmail"
        field-name="email"
        inputType="string"
        v-model="userData.email"
      />
      <form-component-input
        @update-text="updatePassword"
        field-name="password"
        inputType="string"
        v-model="userData.password"
      />
      <form-component-input
        @update-text="updatePasswordConfirm"
        field-name="passwordConfirm"
        inputType="string"
        v-model="userData.passwordConfirm"
      />
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
