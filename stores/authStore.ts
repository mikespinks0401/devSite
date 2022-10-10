
export const useAuthStore = defineStore('authStore', () => {
  const name = ref('John Doe')
  const admin = ref(true)
  const accessToken = ref("")

  function updateName(newName: string){
    name.value = newName
  }

  const login = async (email: string, password: string) => {
      return useAsyncData(
        'login', 
        ()=> $fetch('/api/v1/auth/login', {
          method: 'POST', 
          body: {email: email, password: password}
          }), {initialCache:false},
        )

  }
    

  

  return { name, admin, updateName, login }
})
