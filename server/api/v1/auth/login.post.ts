import { loginUserSchema, getUserByEmail, updateUserPasswordAttempts, verifyUser, lockOutUser } from "~~/server/db/user"
import { userTransformer } from '~~/server/transforms/users'


export default defineEventHandler(async event => {

    //grab data
    const body = await useBody(event)
    //validate data
    const zodBody = loginUserSchema.parse(body)
    if(!loginUserSchema.safeParse(body)){
        sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Invalid Credentials'
        }))
    }

    const user = await getUserByEmail(zodBody.email)
    if(!user){
        sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Invalid Credentials'
        }))
    }


    const authorized = verifyUser(zodBody.password, user.password)
    if(!authorized){
        const user = await updateUserPasswordAttempts(zodBody.email)
        if(user.attempts >= 3){
           const lockedOut = lockOutUser(zodBody.email)
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