<script setup lang="ts">
  const props = defineProps({
    itemTitle: String,
    itemIcon: String,
    itemDescriptions: Array<string>,
  })
  const icon = props.itemIcon
  const title = props.itemTitle
  const descriptions = props.itemDescriptions
</script>

<template>
  <div class="flex">
    <icons-off-center-icon :icon="icon" :size="24" />
    <div>
      <h3 class="font-bold text-xl text-primaryAccent">
        {{ props.itemTitle }}
      </h3>
      <ul>
        <li v-for="(item, index) in descriptions" :key="index">
          <p class="italic font-semibold text-lg">{{ item }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
