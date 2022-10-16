<script setup lang="ts">
import z from 'zod'


const router = useRouter()
const showAlert = ref(false)
const inputErrorsList = ref([])
const authStore = useAuthStore()
const loading = ref(false)

const registerUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  password: z.string().min(7, { message: 'Password Must Be More Than 7 Characters Long' }).trim(),
  passwordConfirm: z.string().nullable(),
  token: z.string()
}).refine(data => data.password === data.passwordConfirm,
  { message: 'Password Confirm Must Match Password' })


interface User{
  email: string,
  password: string,
  passwordConfirm: string,
  token: string
}

const handleSubmit = async (data: User):Promise<void> => {

  clearAndCheckForParseErrors(data)
  if (hasErrors()) {
    return
  }
  loading.value = true
  const response = await authStore.register(data)
  if(!response.success){
    console.log('we have errors')
    const error = response.error
    checkForErrorAndIncludeInModal(error, 'Captcha', 'Server Error - Please Try Again')
    checkForErrorAndIncludeInModal(error, 'Email', "Email Already Exist")
    if(hasErrors()){
      showAlert.value = true
      loading.value = false
      return
    }
  } else {
    router.push('/')
  }
  loading.value = false

}


const checkForErrorAndIncludeInModal = (errorObject: object, needle: string, displayMessage: string = needle) => {
  const errorString = errorObject.toString().toLowerCase()
  if (errorString.includes(needle.toLowerCase())) {
    inputErrorsList.value.push(displayMessage)
  }
}
const hasErrors = () => {
  return inputErrorsList.value.length > 0 
}

const clearAndCheckForParseErrors = (data) => {
  inputErrorsList.value = []
  if (data.email === "" || data.password === "" || data.passwordConfirm === "") {
    inputErrorsList.value.push('All Fields Required')
    showAlert.value = true
    return
  }



  const result = registerUserSchema.safeParse(data)
  if (result.success === false) {
    const { error } = result
    Object.keys(error.issues).forEach(item => inputErrorsList.value.push(error.issues[item].message))
    showAlert.value = true
  }
}


const closeModal = () => {
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
        :loading=loading
        submitValue='Sign Up'
      />
    </div>
  </div>
</template>

<style lang="postcss">
input {
  @apply py-2 px-1;
}
</style>
