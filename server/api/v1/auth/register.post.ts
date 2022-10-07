import { userTransformer } from '~~/server/transforms/users'
import { H3Event } from 'h3'
import { registerUserSchema, createUser, getUserByEmail } from '~~/server/db/user'

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
    
    //Check If Email Already Exist In DB
    const emailExists = await getUserByEmail(body.email)
    
    //Send errror if Email already exists
    if(emailExists){
        sendError(event, createError({
            statusCode: 409,
            statusMessage: 'Email Already Exists'
        }))
    }

    const user = await createUser(body)

    event.res.statusCode = 201

    return {
        data: userTransformer(user)
    }





    
})

function isBodyEmpty(event: H3Event, body){
    if(!body){
        sendError(event, createError({
            statusCode: 400,
            statusMessage: 'all fields required'
        }))
    }
}