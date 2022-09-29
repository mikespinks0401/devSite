<script setup lang="ts">
  const props = defineProps({
    size: Number,
    icon: String,
    bgColor: String,
  })
  const bgColor = props.bgColor
  const iconBgClass = `bg-${bgColor}`

</script>

<template>
    <div class="pr-12">
      <div class="h-4 w-4 bg-primaryAccent">
        <div class="relative top-[6px] left-2">
          <icons-contact-icons :icon-name="icon" :size="props.size"/>
        </div>
      </div>
    </div>

</template>
