<script setup lang="ts"></script>
<template>
  <div class="flex-1 container mx-auto max-w-6xl">
    <div class="flex justify-center mt-6">
      <h1 class="text-5xl text-opacity-80 mb-16">Contact</h1>
    </div>
    <div class="container w-full mx-auto grid lg:grid-cols-4 mt-18 gap-16">
      <!--Contact Left Side-->
      <div data-cy="contact-left" class="md:col-span-3 px-4">
        <p class="text-2xl font-semibold text-primaryAccent">
          Ready To Collaborate?
        </p>
        <h2 class="text-3xl pt-2">Let's get to work</h2>
        <p class="pt-3">
          I look forward to connecting with you and will respond within 48 hours
        </p>
        <br />
        <p>Thank you for stopping by!</p>
        <contact-form />
      </div>
      <!--Contact Right-->
      <div
        data-cy="contact-info"
        class="w-full flex flex-col justify-center lg:items-center px-4"
      >
        <contact-info-card />
      </div>
    </div>
  </div>
</template>
