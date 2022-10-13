<script setup lang="ts">
const name = ref('')
const email = ref('')
const phoneNumber = ref('')

const message = ref('')

const showNameRequired = ref(false)
const showEmailRequired = ref(false)
const showMessageRequired = ref(false)

const inputErrorsList = ref([])
const inputErrorsMsg = ref('')

const showAlert = ref(false)
const showSuccess = ref(false)

const requiredFieldClass =
  'font-medium absolute -top-6 text-danger dark:text-dangerDark transition'
const updateName = (v: string) => {
  name.value = v
  if (showNameRequired.value === true && name.value !== '') {
    showNameRequired.value = false
  }
  if (showNameRequired.value === false && name.value === '') {
    showNameRequired.value = true
  }
}

const updateEmail = (v: string) => {
  email.value = v
  if (showEmailRequired.value === true && email.value !== '') {
    showEmailRequired.value = false
  }
  if (showEmailRequired.value === false && email.value === '') {
    showEmailRequired.value = true
  }
}

const updatePhoneNumber = (v: string) => {
  phoneNumber.value = v
}

const updateMessage = () => {
  if (showMessageRequired && message.value !== '') {
    showMessageRequired.value = false
  }
  if (showMessageRequired.value === false && message.value === '') {
    showMessageRequired.value = true
  }
}

function submitContactForm() {
  clearErrorData()
  checkRequiredInputs()
  alertIfErrors()
  showSuccess.value = true

}


function clearErrorData(): void {
  inputErrorsList.value = []
  inputErrorsMsg.value = ''
}

const clearForm = () => {
  name.value = ''
  email.value = ''
  message.value = ''
  phoneNumber.value = ''
}
function checkRequiredInputs() {
  if (name.value === '') {
    showNameRequired.value = true
    inputErrorsList.value.push('Name Required')
  }
  if (email.value === '') {
    showEmailRequired.value = true
    inputErrorsList.value.push('Email Required')
  }
  if (message.value === '') {
    showMessageRequired.value = true
    inputErrorsList.value.push('Message Required')
  }
}
function alertIfErrors() {
  if (
    showNameRequired.value === true ||
    showEmailRequired.value === true ||
    showMessageRequired.value === true
  ) {
    let current = 0
    for (let error of inputErrorsList.value) {
      inputErrorsMsg.value += error
      if (current + 1 === inputErrorsList.value.length) {
        showAlert.value = true
      } else {
        inputErrorsMsg.value += '\n'
        current++
      }
    }
  }
}
</script>

<template>
  <div class="w-full mb-8">
    <!--Show error Alert Below-->
    <teleport
      v-if="showAlert"
      to="#modal"
    >
      <modals-alert
        @closeModal="showAlert = false"
        title="Alert"
        buttonText="Got It"
      >
        <div
          v-for="(error, index) of inputErrorsList"
          :key="index"
        >
          <p class="block text-center text-danger font-medium">{{ error }}</p>
        </div>
      </modals-alert>
    </teleport>
    <!--Show Success Alert Below-->
    <teleport
      v-if="showSuccess"
      to="#modal"
    >
      <modals-alert
        @closeModal="showSuccess = false"
        title="Success"
        buttonText="Close"
        buttonColor="bg-primaryAccent2 hover:bg-primaryAccent2Hover"
      >
        <p class="block text-center  font-medium">Form Successfully Submitted</p>
      </modals-alert>
    </teleport>
    <form
      @submit.prevent
      autocomplete="off"
    >
      <div class="z-30 grid md:grid-cols-2 gap-6 w-full mt-8">
        <div class="relative">
          <p
            v-if="showNameRequired"
            :class="requiredFieldClass"
          >
            Name Required*
          </p>
          <form-component-input
            @update-text="updateName"
            classes="focus:border-primaryAccent2"
            fieldName="Name"
            inputType="text"
            ariaLabel="Input your name"
            :required="true"
            data-cy="name"
          />
        </div>
        <div class="relative">
          <p
            v-if="showEmailRequired"
            :class="requiredFieldClass"
          >
            Email Required*
          </p>
          <form-component-input
            @update-text="updateEmail"
            classes="focus:border-primaryAccent2"
            fieldName="Email"
            inputType="email"
            ariaLabel="Input your email"
            :required="true"
            data-cy="email"
          />
        </div>
        <div class="md:col-span-2">
          <form-component-input
            @update-text="updatePhoneNumber"
            classes="focus:border-primaryAccent2"
            fieldName="Phone Number"
            inputType="text"
            ariaLabel="Input your phone number"
            :required="false"
            data-cy="phoneNumber"
          />
        </div>
        <div class="md:col-span-2 relative">
          <p
            v-if="showMessageRequired"
            :class="requiredFieldClass"
          >
            Message Required*
          </p>
          <textarea
            @input="updateMessage"
            class="text-black resize-none w-full hover:ring-0 focus:border-primaryAccent2"
            rows="6"
            placeholder="Please Enter Your Message"
            v-model="message"
            data-cy="message"
          ></textarea>
        </div>
        <input
          @click="submitContactForm"
          class="bg-primaryAccent2 px-4 py-1 font-semibold text-center text-white cursor-pointer hover:bg-primaryAccent2Hover"
          inputType="submit"
          value="Submit Form"
          aria-label="Submit Form"
          data-cy="submit"
        />
      </div>
    </form>
  </div>
</template>

<style lang="postcss" scoped>
form>input {
  @apply focus:border-primaryAccent2;
}
</style>
