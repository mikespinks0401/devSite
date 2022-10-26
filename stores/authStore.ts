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


  type FetchOptions = {
    options?: string[],
    headers?: string[]
  }


  const authFetch = (url: string, options:FetchOptions = {}) => {
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



  const login = async (email: string, password: string, rememberMe: boolean, token: string) => {

      const { data, error} = await useAsyncData(
          'login', 
          ()=> $fetch('/api/v1/auth/login', {
          method: 'POST', 
          body: {email: email, password: password, rememberMe: rememberMe, token: token}
          }), {initialCache:false},
        ) as any

        if(error.value){
          return {
            error: error.value
          }
        } else {
            updateUser(data.value.data.user, data.value.data.accessToken) 
          return data
        }  
  }

  const register = async ({email, username, password, passwordConfirm, token}) => {

      const { data, error} = await useAsyncData(
          'register', 
          ()=> $fetch('/api/v1/auth/register', {
          method: 'POST', 
          body: {email: email, username: username, password: password, passwordConfirm: passwordConfirm, token: token}
          }), {initialCache:false},
        ) as any

        if(error.value){
          return {
            success: false,
            error: error.value
          }
        } else {
            updateUser(data.value.data.user, data.value.data.accessToken) 
          return {
            success: true
          }
        }  
  }

  const logout = async() => {
    try{
     const response =  await authFetch('/api/v1/auth/logout') as any
      if(response.success){
        clearUser()
      }
      
    } catch (err){
      console.log('there was an error')
    }
  }
    
  const init = () => {
  
  return new Promise(async (resolve, reject)=>{
    
    try{
          const response = await refreshToken()
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

  return {isLoggedIn, login, register, updateUser, init, logout }
})
