import z from 'zod'


export default defineEventHandler( async event => {
    
    const UserSchema = z.object({
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(7, { message: 'Password Must Be More Than 7 Characters Long' }).trim(),
      passwordConfirm: z.string().nullable()
    }).
      refine(data => data.password === data.passwordConfirm,
        { message: 'Password Confirm Must Match Password' })

    
    const body = await useBody(event)
    if(!body){
        sendError(event, createError({
            statusCode: 400,
            statusMessage: 'all fields required'
        }))
    }
    const result = UserSchema.safeParse(body)

    if(!result.success){
        sendError(event, createError({
            statusCode: 400,
            statusMessage: 'All fields Required'
        }))
    }





    
})