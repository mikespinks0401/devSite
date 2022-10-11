import { sendRefreshToken } from './../../../utils/jwt';
import { resetUserPasswordAttempts } from './../../../db/user';
import { loginUserSchema, getUserByEmail, incrementUserPasswordAttempts, verifyUser, lockOutUser } from "~~/server/db/user"
import { userTransformer } from '~~/server/transforms/users'
import { generateTokens } from '~~/server/utils/jwt';
import { createRefreshToken } from '~~/server/db/refreshTokens';


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
        return
    }

    const user = await getUserByEmail(body.email)
    //check if email address exists
    if(!user){
        sendError(event, createError({
            //check if user is locked out
            statusCode: 401,
            statusMessage: 'Invalid Credentials'
        }))
        return
    }
    if(user.lockedOut === true){
        sendError(event, createError({
            statusCode: 403,
            statusMessage: 'Account Currently Locked Out, Please Reset Password'
        }))
        return
    }
    
    
    const authorized = await verifyUser(body.password, user.password)
    if(!authorized){
        await incrementUserPasswordAttempts(user.id)
        if(user.attempts >= 5){
           await lockOutUser(body.email)
        }
        sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Invalid Credentials'
        }))
        return
    }
    //reset user login attempts
    await resetUserPasswordAttempts(user.id)

    //generate tokens with user and remember Me option
    const {accessToken, refreshToken} = generateTokens(user, body.rememberMe)

    //add RefreshToken To Database
    await createRefreshToken(refreshToken, user.id)


    sendRefreshToken(event, refreshToken)    
    return {
        data: {
            accessToken: accessToken,
            user: userTransformer(user)
        }
        }
    
})