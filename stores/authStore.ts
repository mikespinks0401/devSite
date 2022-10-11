
export const useAuthStore = defineStore('authStore', () => {
  const accessToken = ref("")
  const userName = ref("")
  const updateToken = (newToken: string):void => {
    accessToken.value = newToken
  }
  const updateUserName = (newName: string ):void => {
    userName.value = newName
  }

  const updateUser = (user, token) => {
    updateUserName(user)
    updateToken(token)
  }

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
      return useAsyncData(
        'login', 
        ()=> $fetch('/api/v1/auth/login', {
          method: 'POST', 
          body: {email: email, password: password, rememberMe: rememberMe}
          }), {initialCache:false},
        )

  }
    

  

  return { login, updateUser }
})
