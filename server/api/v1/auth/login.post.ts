import { loginUserSchema, getUserByEmail, updateUserPasswordAttempts, verifyUser, lockOutUser } from "~~/server/db/user"
import { userTransformer } from '~~/server/transforms/users'


export default defineEventHandler(async event => {

    //grab data
    const body = await useBody(event)
    //validate data
    const result = loginUserSchema.safeParse(body)
    if(!result.success){
        sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Invalid Credentials'
        }))
    }

    const user = await getUserByEmail(body.email)
    if(!user){
        sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Invalid Credentials'
        }))
    }
    if(user.lockedOut === true){
        sendError(event, createError({
            statusCode: 403,
            statusMessage: 'Account Currently Locked Out, Please Reset Password'
        }))
    }
    

    const authorized = verifyUser(body.password, user.password)
    if(!authorized){
        const user = await updateUserPasswordAttempts(body.email)
        if(user.attempts >= 3){
           await lockOutUser(body.email)
           return {
            ...userTransformer(user),
            lockedOut: true
           }
        }
        sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Invalid Credentials'
        }))

    }
    else {
        return {
            data: userTransformer(user)
        }
    }
})