import { JwtPayload } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';


export const useAuthStore = defineStore('authStore', () => {
  const accessToken = ref("")
  const email = ref("")
  const isLoggedIn = computed(()=> {
    return accessToken.value.length > 0 ? true : false
  })
  const updateToken = (newToken: string):void => {
    accessToken.value = newToken
  }
  const updateEmail = (newName: string ):void => {
    email.value = newName
  }
  const clearUser = () => {
    accessToken.value = "",
    email.value = ""
  }
  const authFetch = (url: string, options = {}) => {
    return $fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer: ${accessToken.value}`
      }
    })
  }

  const refreshToken = async() => {
       try{
        const res = await $fetch('api/v1/tokens/refresh')
        if(res.data.access_Token){
          updateToken(res.data.access_Token)
        }   
       }catch(err){
       }
      return
  }

  const tokenReRefresher = () => {
    if(!accessToken.value){
      return
    }
    const decoded = jwt_decode(accessToken.value) as JwtPayload
    const waitTime = (decoded.exp - decoded.iat) * 1000 - 60000
    setTimeout(async ()=>{
      await refreshToken(),
      tokenReRefresher()
    },waitTime)

  }

  const updateUser = (user, token) => {
      updateEmail(user.email)
      updateToken(token)
  }

  const login = async (email: string, password: string, rememberMe: boolean) => {

      const { data, error} = await useAsyncData(
          'login', 
          ()=> $fetch('/api/v1/auth/login', {
          method: 'POST', 
          body: {email: email, password: password, rememberMe: rememberMe}
          }), {initialCache:false},
        )

        if(error.value){
          return {
            error: error.value
          }
        } else {
            await updateUser(data.value.data.user, data.value.data.accessToken) 
          return data
        }  
  }

  const logout = async() => {
    try{
      await authFetch('/api/v1/auth/logout')
      clearUser()
    } catch (err){
      console.log('there was an error')
    }
  }
    
  const init = () => {
  
  return new Promise(async (resolve, reject)=>{
    
    try{
          await refreshToken()
          if(accessToken.value){
            tokenReRefresher()
          }
          resolve(true)
        }
        catch (error){
          reject(error)
        }
       })
  }

  return {isLoggedIn, login, updateUser, init, logout }
})
