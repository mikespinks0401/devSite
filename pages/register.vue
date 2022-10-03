<script setup lang="ts">
  const showAlert = ref(false)
  const inputErrorsList = ref([])
  function handleSubmit() {
    console.log('called')
  }
</script>

<template>
  <div class="flex-1 flex flex-col w-full overflow-hidden" data-cy="about">
    <div class="flex justify-center mt-6">
      <h1 class="text-5xl text-opacity-80 mb-16">Register</h1>
      <teleport v-if="showAlert" to="#modal">
        <modals-alert
          @closeModal="showAlert = false"
          title="Alert"
          buttonText="Got It"
        >
          <div v-for="error of inputErrorsList">
            <p class="block text-center text-danger font-medium">{{ error }}</p>
          </div>
        </modals-alert>
      </teleport>
      <auth-form :handle-submit=handleSubmit />
    </div>
  </div>
</template>

<style>
  input {
    @apply py-2 px-1;
  }
</style>
