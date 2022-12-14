import z from 'zod'
import { validateCaptcha } from '~~/server/utils/captcha'
import { email, mainEmail, siteEmail } from '~~/server/utils/mail'

export default defineEventHandler(async event => {

    
    const userSchema = z.object({
        name: z.string().min(1).trim(),
        emailAddress: z.string().min(1).email().trim(),
        message: z.string().min(1).trim(),
        token: z.string(),
        phoneNumber: z.string().nullable()
    })

    const body = await useBody(event)

    const result = userSchema.safeParse(body)
    if(!result.success){
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Bad Request' 
        }))
    }
    const {name, emailAddress, message, phoneNumber, token} = body

    ///////////////Validate Captcha Token//////////////
    const captchaResponse = await validateCaptcha(token)
    if(!captchaResponse.success){
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Captcha Validation Failed'
        }))
    }
    ///////////////////////////////////////////////////

    const emailMessage = {
        emailSubject: '',
        emailAddress:emailAddress,
        emailMsg: message as string,
        emailName: name as string,
        emailPhone: phoneNumber as string
    }
    
    const msgInfo = {
        to: `${mainEmail}, ${siteEmail}`,
        subject: 'Contact Form Submission',
        msg: emailMessage,
        template: 'contact'
    }
    try{
         await email(msgInfo)
    }catch(err){
        console.log(err)
        sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Something Went Wrong'
        }))
    }
    event.res.statusCode = 200
    return {
        info: emailMessage,
        message: 'Form Successfully Submitted'
    }

})