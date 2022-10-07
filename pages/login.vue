<script setup lang="ts">
import z from 'zod'

const authStore = useAuthStore()


const showAlert = ref(false)
const formErrors = ref([])

const userSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1)
})

const handleSubmit = async ({ email, password }) => {
  clearAndCheckForErrors(email, password)
  const {data, error} = await authStore.login(email, password)
  if(error){
    formErrors.value.push('Invalid Credentials')
  }

  
}
const closeModal = () => {
  showAlert.value = false
}

function clearAndCheckForErrors(email, password) {
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
