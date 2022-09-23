export const useAuthStore = defineStore('authStore', () => {
  const name = ref('Michael')
  const admin = ref(true)

  return { name, admin }
})
