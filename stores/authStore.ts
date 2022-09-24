export const useAuthStore = defineStore('authStore', () => {
  const name = ref('John Doe')
  const admin = ref(true)

  function updateName(newName: string){
    name.value = newName
  }
  

  return { name, admin, updateName }
})
