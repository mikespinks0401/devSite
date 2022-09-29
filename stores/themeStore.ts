export const useThemeStore = defineStore('themeStore', () => {
  const isLightMode = ref(true)

  function init() {
    return new Promise((resolve, reject) => {
      const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)')
      if (isDarkTheme.matches) {
        isLightMode.value = false
        resolve(true)
      } else {
        console.log('dark mode off')
        resolve(false)
      }
    })
  }
  function changeLightMode() {
    isLightMode.value = !isLightMode.value
  }

  return { isLightMode, changeLightMode, init }
})
