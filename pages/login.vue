<script setup lang="ts">
import z from 'zod'

const authStore = useAuthStore()
const router = useRouter()

const showAlert = ref(false)
const formErrors = ref([])

const userSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1)
})



const handleSubmit = async ({ email, password, rememberMe }) => {
  clearAndCheckFormErrors(email, password)
  if (hasErrors()) {
    displayFormIfErrors()
    return
  }
  const { data, error, refresh } = await authStore.login(email, password, rememberMe)
  if (error.value) {
    checkForErrorAndIncludeInModal(error.value, 'Invalid Credentials')
    checkForErrorAndIncludeInModal(error.value, 'Locked Out', "Account Currently Locked Out\nPlease Reset Password")
    displayFormIfErrors()

  }
  const user = getUser(data)
  console.log(user)

}

const hasErrors = () => {
  return formErrors.value.length > 0 ? true : false
}
const displayFormIfErrors = () => {
  showAlert.value = true
}
const checkForErrorAndIncludeInModal = (errorObject: object, needle: string, displayMessage: string = needle) => {
  const errorString = errorObject.toString().toLowerCase()
  console.log(errorObject)

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
    }
    if (password.length === 0) {
      formErrors.value.push('Password Required')
    }
    if (formErrors.value.length > 0) {
      showAlert.value = true
    }
  }
}

const getUser = (dataObject) => {
  return dataObject?.value?.data?.user ? dataObject.value.data.user : null
}
const redirectUser = () => {
  if (router.back) {
    router.back()
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
