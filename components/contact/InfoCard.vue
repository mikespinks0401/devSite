<script setup lang="ts">
  const cardData = [
    {
      itemTitle: 'Location',
      itemIcon: 'marker-bold',
      itemDescriptions: ['Based in Houston, Texas'],
    },
    {
      itemTitle: 'Email',
      itemIcon: 'email-bold',
      itemDescriptions: ['michael.spinks@mikespinks.com'],
    },
    {
      itemTitle: 'Phone Number',
      itemIcon: 'phone-bold',
      itemDescriptions: ['(+1) 713 766 8719'],
    },
  ]
</script>

<template>
  <div class="flex flex-col gap-5 mb-16">
    <h2 class="text-4xl mb-8 lg:hidden">How To Reach Me</h2>
    <template v-for="(item, index) in cardData" :key="index">
      <contact-info-card-item
        :item-title="item.itemTitle"
        :item-icon="item.itemIcon"
        :item-descriptions="item.itemDescriptions"
        :icon-size="5"
      />
    </template>
  </div>
</template>
