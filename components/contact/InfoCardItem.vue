<script setup lang="ts">
    const props = defineProps({
        itemTitle: String,
        itemIcon: String,
        itemDescriptions: Array<string>
    })
    const icon = props.itemIcon
    const title = props.itemTitle
    const descriptions = props.itemDescriptions
    
</script>

<template>
  <div class="flex">
    <div class="pr-12">
      <div class="h-4 w-4 bg-primaryAccent">
        <div class="relative top-[6px] left-2">
        <icons-contact-icons :icon-name="icon"/>
        </div>
      </div>
    </div>
    <div>
      <h3 class="font-bold text-xl text-primaryAccent">{{props.itemTitle}}</h3>
        <ul>
          <li v-for="(item, index) in descriptions" :key="index">
            <p class="italic font-semibold text-lg">{{item}}</p>
          </li>
        </ul>

        
    </div>
  </div>
</template>
