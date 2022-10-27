import z from 'zod'
import { validateCaptcha } from '~~/server/utils/captcha'
import { email, mainEmail, siteEmail, ContactInfo } from '~~/server/utils/mail'

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
    const captchaResponse = await validateCaptcha(token) as any
    if(!captchaResponse.success){
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Captcha Validation Failed'
        }))
    }
    ///////////////////////////////////////////////////

    const emailMessage:ContactInfo= {
        template: 'contact',
        emailSubject: '',
        emailAddress:emailAddress,
        emailMsg: message, 
        emailName: name,
        emailPhone: phoneNumber
    }
    
    const msgInfo = {
        to: `${mainEmail}, ${siteEmail}`,
        subject: 'Contact Form Submission',
        msg: emailMessage
    }
    try{
        email(msgInfo)
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