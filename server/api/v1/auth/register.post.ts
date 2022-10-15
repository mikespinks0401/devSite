import { userTransformer } from '~~/server/transforms/users'
import { generateTokens, sendRefreshToken } from '~~/server/utils/jwt'
import { registerUserSchema, createUser, getUserByEmail } from '~~/server/db/user'
import { createRefreshToken } from '~~/server/db/refreshTokens'
import { sleep } from '~~/server/utils/functions'

export default defineEventHandler( async event => {  
    const body = await useBody(event)
    await sleep(500)
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
    
    //Check If Email Already Exist In DB
    const emailExists = await getUserByEmail(body.email)
    
    //Send errror if Email already exists
    if(emailExists){
        sendError(event, createError({
            statusCode: 409,
            statusMessage: 'Email Already Exists'
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



function isBodyEmpty(event, body){
    if(!body){
        sendError(event, createError({
            statusCode: 400,
            statusMessage: 'all fields required'
        }))
    }
}