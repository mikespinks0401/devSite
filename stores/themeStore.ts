export const useThemeStore = defineStore('themeStore', () => {
  const isLightMode = ref(true)


  function changeLightMode() {
    isLightMode.value = !isLightMode.value
  }

  return { isLightMode, changeLightMode }
})
