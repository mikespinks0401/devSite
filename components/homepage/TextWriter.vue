<script setup lang="ts">
  const displayText = ref('')
  const currentIndex = ref(0)

  const props = defineProps({
    title: String,
    titles: {
      type: Array<string>,
    },
  })

  function writeText(stringArray: Array<string>, interval: number = 100) {
    const length = stringArray.length
    if (currentIndex.value === length) {
      return
    }
    displayText.value = ''

    const currentString = stringArray[currentIndex.value]
    const textArray = currentString.split('')

    let letter: string
    const write = setInterval(() => {
      if (textArray.length === 0) {
        clearInterval(write)
        currentIndex.value++
        // if (currentIndex.value === length) {
        //   clearInterval(write)
        //   currentIndex.value = 0
        // }
        if (currentIndex.value === length) {
          return
        } else {
          writeText(stringArray)
        }
      }
      if (textArray.length > 0) {
        letter = textArray.shift()
      } else {
        letter = ' '
      }
      displayText.value = displayText.value + letter
    }, interval)
  }
  onMounted(() => {
    writeText(props.titles)
  })
</script>

<template>
  <div class="inline-block">
    {{ displayText }}
  </div>
</template>
