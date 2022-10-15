<script setup lang="ts">
  
  interface Props{
     titles: Array<string>
      loop?: boolean
      timeToStart?: number
      pauseTime?: number
  }  
  
  const props = withDefaults(defineProps<Props>(), {
    loop: false
  })
    const displayText = ref('')
    const currentIndex = ref(0)

  const writeText = (stringArray: Array<string>, interval: number = 100):void => {
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
        if (currentIndex.value === length) {
          if (props.loop) {
            currentIndex.value = 0
            writeText(stringArray)
          }
        } else {
          setTimeout(() => {
            writeText(stringArray)
          }, props.pauseTime)
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
    setTimeout(() => {
      writeText(props.titles)
    }, props.timeToStart)
  })
</script>

<template>
  <ClientOnly>
    <div class="inline-block">
      {{ displayText }}
    </div>
  </ClientOnly>
</template>
