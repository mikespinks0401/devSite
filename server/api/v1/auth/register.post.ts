import { userTransformer } from '~~/server/transforms/users'
import { generateTokens, sendRefreshToken } from '~~/server/utils/jwt'
import { registerUserSchema, createUser, getUserByEmail, getUserByUsername } from '~~/server/db/user'
import { createRefreshToken } from '~~/server/db/refreshTokens'
import { validateCaptcha } from '~~/server/utils/captcha'

export default defineEventHandler( async event => {  
    const body = await useBody(event)
    //Return error if form is empty
    isBodyEmpty(event, body)
    //Make sure data is shaped properly following registerUserSchema
     const result = registerUserSchema.safeParse(body)

     //Send error if fields are incorrect
    if(!result.success){
        sendError(event, createError({
            statusCode: 400,
            statusMessage: 'All fields Required'
        }))
    }

    ///////////TOKEN-VALIDATION//////////////////
    const token = body.token
    const captchaResponse = await validateCaptcha(token)
    if(!captchaResponse.success){
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Captcha Failed'
        }))
    }
    ////////////////////////////////////////////////

    //Check If Email Already Exist In DB
    const emailExists = await getUserByEmail(body.email)
    
    if(emailExists){
        sendError(event, createError({
            statusCode: 409,
            statusMessage: 'Email Already Exists'
        }))
    }

    //Check If Email Already Exist In DB
    const usernameExists = await getUserByUsername(body.email)
    
    if(usernameExists){
        sendError(event, createError({
            statusCode: 409,
            statusMessage: 'Username Already Exists'
        }))
    }
    

    //Put User into DB
    const user = await createUser(body)

    //Create Tokens for user to be logged in
    const {accessToken, refreshToken} = generateTokens(user)
    try{
        await createRefreshToken(refreshToken, user.id)
        sendRefreshToken(event, refreshToken)
    } catch(err) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'There was a server error'
        }))
    }

    event.res.statusCode = 201

    return {
        data:{
            accessToken: accessToken,
            user: userTransformer(user)
        }
    }
    
})



const isBodyEmpty = (event, body) => {
    if(!body){
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'all fields required'
        }))
    }
}