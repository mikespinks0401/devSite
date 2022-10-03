<script setup lang="ts"></script>

<template>
  <div>
    <form @submit.prevent data-cy="auth form">
      <forms-input field-name="email" />
      <forms-input field-name="password" />
      <forms-input field-name="passwordConfirm" />
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
