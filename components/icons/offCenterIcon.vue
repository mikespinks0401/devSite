<script setup lang="ts">
  const props = defineProps<{
    size: number
    icon: string
    bgColor?: string
  }>()
  const bgColor = props.bgColor
  const iconBgClass = `bg-${bgColor}`
  const sizeToPass = props.size
</script>

<template>
  <div class="pr-12">
    <div class="h-4 w-4 bg-primaryAccent">
      <div class="relative top-[6px] left-2">
        <icons-contact-icons :icon-name="icon" :icon-size="sizeToPass" />
      </div>
    </div>
  </div>
</template>
