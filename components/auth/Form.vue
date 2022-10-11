<script setup lang="ts">
const props = defineProps<{
  handleSubmit?: Function
  formTitle: String
}>()
const emits = defineEmits(['error']['sendFormData'])

const userData = reactive({
  email: '',
  password: '',
  passwordConfirm: '',
  rememberMe: false
})

const updateEmail = (v: string) => {
  userData.email = v
}
const updatePassword = (v: string) => {
  userData.password = v
}
const updatePasswordConfirm = (v: string) => {
  userData.passwordConfirm = v
}
const submitForm = () => {
  if (props.formTitle === 'Login') {
    const loginData = {
      email: userData.email,
      password: userData.password,
      rememberMe: userData.rememberMe
    }
    emits('sendFormData', loginData)
  } else {
    const loginData = {
      email: userData.email,
      password: userData.password,
      passwordConfirm: userData.passwordConfirm
    }
    emits('sendFormData', loginData)
  }
}

const inputClasses = "border focus:border-color-primaryAccent2"
</script>

<template>
  <div class="z-40 px-4 pb-8 border-2 bg-white w-full md:max-w-lg dark:text-black">
    <div class="border-b-2 mb-8">
      <h1 class=" text-center text-2xl  font-semibold p-4">{{props.formTitle}}</h1>
      <p
        v-if="props.formTitle !== 'Sign Up'"
        class="font-semibold pt-8 pb-2 text-xl text-gray-600"
      >Welcome Back</p>
    </div>
    <form
      @submit.prevent="submitForm"
      data-cy="auth form"
    >
      <div class="flex flex-col gap-4 mb-2">
        <form-component-input
          @update-text="updateEmail"
          :required="true"
          data-cy="email"
          field-name="email"
          inputType="string"
          v-model="userData.email"
          :inputClasses="inputClasses"
        />
        <form-component-input
          @update-text="updatePassword"
          :required="true"
          data-cy="password"
          field-name="password"
          inputType="string"
          v-model="userData.password"
          :inputClasses="inputClasses"
        />

        <form-component-input
          v-if="props.formTitle === 'Sign Up'"
          @update-text="updatePasswordConfirm"
          :required="true"
          field-name="confirm password"
          data-cy="confirm password"
          inputType="string"
          v-model="userData.passwordConfirm"
          :inputClasses="inputClasses"
        />
      </div>
      <div class="flex items-center">
        <div
          v-if="props.formTitle === 'Login'"
          class="flex w-full gap-2 relative -top-2"
        >
          <div class="flex-1 flex w-full items-center justify-between ">
            <div class="flex items-center gap-1">
              <input
                v-model="userData.rememberMe"
                type="checkbox"
                name="remember me"
                data-cy="remember me"
              />
              <label
                class="font-medium text-sm text-gray-600"
                for="remember me"
              >Remember Me</label>
            </div>
            <nuxt-link
              class="self-end"
              to="#"
            ><span
                class="text-gray-600 text-sm font-medium hover:text-gray-400"
                data-cy="forgot password"
              >Forgot Password</span></nuxt-link>
          </div>
        </div>
        <div
          v-if="props.formTitle === 'Sign Up'"
          class="flex"
        >
          <input
            class="mr-2"
            type="checkbox"
          />
          <p class="text-xs text-gray-500">By clicking here, I state that I have read and understood the terms and
            conditions.</p>
        </div>
      </div>
      <div class="mt-2 flex justify-center bt-2">
        <input
          data-cy="formSubmit"
          class="cursor-pointer bg-primaryAccent2 text-white font-semibold w-full"
          type="submit"
          aria-label="submit registration"
          value="Submit"
        />
      </div>
    </form>
  </div>
</template>
