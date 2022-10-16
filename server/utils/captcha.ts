
const config = useRuntimeConfig()
const secret = config.turnstile.secretKey




export const validateCaptcha = async (token:string) => {
    let formData = new FormData()
    formData.append('secret', secret)
    formData.append('response', token)
    const response = await $fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
         method: 'POST',
         body: formData,
        })
        return response
}