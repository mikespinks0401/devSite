<script setup lang="ts">
import z from 'zod'

const authStore = useAuthStore()
const router = useRouter()

const showAlert = ref(false)
const formErrors = ref([])

const userSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1)
})

const emailSchema = z.object({
  email: z.string().min(1).email()
})


const handleSubmit = async ({ email, password, rememberMe }) => {
  clearAndCheckFormErrors(email, password)
  if (hasErrors()) {
    displayFormIfErrors()
    return
  }
  const response:any  = await authStore.login(email, password, rememberMe)
    if(response.error){
        const error = response.error
        checkForErrorAndIncludeInModal(error, 'Invalid Credentials')
        checkForErrorAndIncludeInModal(error, 'Locked Out', "Account Currently Locked Out\nPlease Reset Password")
        displayFormIfErrors()
    }

  redirectUser()
}

const hasErrors = () => {
  return formErrors.value.length > 0 ? true : false
}
const displayFormIfErrors = () => {
  showAlert.value = true
}
//takes apart the error response object from the server and adds it to form errors
const checkForErrorAndIncludeInModal = (errorObject: object, needle: string, displayMessage: string = needle) => {
  const errorString = errorObject.toString().toLowerCase()
  if (errorString.includes(needle.toLowerCase())) {
    formErrors.value.push(displayMessage)
    showAlert.value = true
  }
}

const closeModal = () => {
  showAlert.value = false
  formErrors.value = []
}

const clearAndCheckFormErrors = (email, password) => {
  formErrors.value = []
  const result = userSchema.safeParse({ email: email.value, password: password.value })

  if (!result.success) {
    if (email.length === 0) {
      formErrors.value.push('Email Required')
    } else {
      const emailResult = emailSchema.safeParse({email: email})
      if(!emailResult.success){
        formErrors.value.push('Invalid Email Format')
      }
    }
    if (password.length === 0) {
      formErrors.value.push('Password Required')
    }
    if (formErrors.value.length > 0) {
      showAlert.value = true
    }
  }
}


const redirectUser = (previous: string = null) => {
 if(previous){
  router.push(previous)
 } else {
    router.push('/')
  }
}

</script>

<template>
  <div
    class="flex-1 flex flex-col w-full items-center h-full justify-center overflow-hidden"
    data-cy="about"
  >
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
        <div v-for="error of formErrors">
          <p class="block text-center text-danger font-medium">{{ error }}</p>
        </div>
      </modals-alert>
    </teleport>
    <auth-form
      form-title="Login"
      @sendFormData="handleSubmit"
    />
  </div>
</template>
