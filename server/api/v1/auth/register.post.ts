import z from 'zod'
import { prisma } from '../../../db'


export default defineEventHandler( async event => {
    
    const UserSchema = z.object({
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(7, { message: 'Password Must Be More Than 7 Characters Long' }).trim(),
      passwordConfirm: z.string()
    }).
      refine(data => data.password === data.passwordConfirm,
        { message: 'Password Confirm Must Match Password' })

    
    
    const body = await useBody(event)
    //Return Error is sumbmission is empty
    if(!body){
        sendError(event, createError({
            statusCode: 400,
            statusMessage: 'all fields required'
        }))
    }
    //Make sure data is shaped properly following UserSchema
    const result = UserSchema.safeParse(body)
    if(!result.success){
        sendError(event, createError({
            statusCode: 400,
            statusMessage: 'All fields Required'
        }))
    }

    //Check If Email Already Exist In DB
    const emailExists = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })
    if(emailExists){
        sendError(event, createError({
            statusCode: 409,
            statusMessage: 'Email Already Exists'
        }))
    }

    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: body.password,
            passwords: {
                create: {
                    password: body.password
                }
            }
        }
    })


    event.res.statusCode = 201


    return {
        data: user
    }





    
})