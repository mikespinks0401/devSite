<script setup lang="ts">
  interface Props {
    itemTitle: string
    itemIcon: string
    itemDescriptions: Array<string>
    iconSize?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    iconSize: 5,
  })
  const icon = props.itemIcon
  const title = props.itemTitle
  const descriptions = props.itemDescriptions
  const iconSize = props.iconSize
</script>

<template>
  <div class="flex relative">
    <icons-off-center-icon :icon="icon" :size="iconSize" />
    <div class="relative -top-2">
      <h3 class="font-bold text-xl text-primaryAccent">
        {{ title }}
      </h3>
      <ul>
        <li v-for="(item, index) in descriptions" :key="index">
          <p class="italic font-semibold text-lg">{{ item }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
