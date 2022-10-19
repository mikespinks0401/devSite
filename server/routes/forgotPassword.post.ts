import { getUserByEmail } from '~~/server/db/user';
import { z } from "zod"
import { genarateForgotPasswordToken } from '../utils/jwt';
import { createPasswordResetToken } from '../db/resetPasswordTokens';
import { email, ResetPassword } from '~~/server/utils/mail';
import { randomBytes } from 'crypto'

//get config to grab siteName to use
const config = useRuntimeConfig()

//get localhost for dev or actual name if site is live
const siteName = config.siteName


//define email shape to check for
const EmailSchema = z.string().email()


export default defineEventHandler( async event => {
    
    const body = await useBody(event)
    const email = body.email

    const isSafeEmail = EmailSchema.safeParse(email)

    //return message sent without any further processing
    if(!isSafeEmail.success){
        return {
            msg: 'Message Sent'
        }
    }

    //get userDetails from db
    const user = await getUserByEmail(email)
    if(!user){
        return {
            msg: 'Message Sent'
        }
    }

    const secret = randomBytes(10).toString('hex')

    //create token that expires in 10 minutes
    const token = genarateForgotPasswordToken(user, secret)

    const dbToken = {
        token: token,
        userId: user.id,
        secret: secret
    }


    //put resetPasswordToken in DB
    await createPasswordResetToken(dbToken)

    //generate link to be sent
    const link = `${siteName}/user/password/reset/confirm?uid=${user.id}&token=${token}`


    //set email information
        const emailMessage:ResetPassword = {
        template: 'resetPassword',
        emailUsername: user.username,
        resetPasswordLink: link,
    }


    //email details
    const msgInfo = {
        to: `${email}`,
        subject: 'Reset Your Password',
        msg: emailMessage
    }

    //send email

    email(msgInfo)
    return {
        msg: 'message sent'
    }
})