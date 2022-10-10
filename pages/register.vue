<script setup lang="ts">
import z from 'zod'

const router = useRouter()
const showAlert = ref(false)
const inputErrorsList = ref([])

const registerUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  password: z.string().min(7, { message: 'Password Must Be More Than 7 Characters Long' }).trim(),
  passwordConfirm: z.string().nullable()
}).refine(data => data.password === data.passwordConfirm,
    { message: 'Password Confirm Must Match Password' })

    
const handleSubmit = async (data) => {

  clearAndCheckForParseErrors(data)

  if(hasErrors()){
    return
  }
  try {
    const response = await $fetch('/api/v1/auth/register', {
      method: "POST",
      body: data
    })
    router.push('/')
  }
  catch (err) {
    inputErrorsList.value.push('Email Already Exists')
    showAlert.value = true
  }

}

const hasErrors = () => {
  return inputErrorsList.value.length > 0 ? true : false
}

const clearAndCheckForParseErrors = (data) => {
  inputErrorsList.value = []
  if(data.email === "" || data.password === "" || data.passwordConfirm === ""){
    inputErrorsList.value.push('All Fields Required')
    showAlert.value = true
    return
  }
  const result = registerUserSchema.safeParse(data)
  if (!result.success) {
    Object.keys(result.error.issues).forEach(item => inputErrorsList.value.push(result.error.issues[item].message))
    showAlert.value = true
  }
}
function closeModal() {
  showAlert.value = false
}

</script>

<template>
  <div
    class="flex-1 flex flex-col w-full overflow-hidden"
    data-cy="register"
  >
    <div class="flex justify-center mt-6">
      <!--<h1 class="text-5xl text-opacity-80 mb-16">Register</h1>-->
      <teleport
        v-if="showAlert"
        to="#modal"
      >
        <!--Alert Model-->
        <modals-alert
          @closeModal="closeModal"
          title="Alert"
          buttonText="Got It"
        >
          <div v-for="error of inputErrorsList">
            <p class="block text-center text-danger font-medium">{{ error }}</p>
          </div>
        </modals-alert>
      </teleport>
    </div>
    <div class="px-2 pt-8 pb-10 md:px-0 flex flex-col flex-1 justify-center items-center min-h-full">
      <auth-form
        class="shadow"
        @sendFormData="handleSubmit"
        formTitle="Sign Up"
      />
    </div>
  </div>
</template>

<style lang="postcss">
input {
  @apply py-2 px-1;
}
</style>
