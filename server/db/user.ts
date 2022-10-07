import { prisma } from '.'
import { z } from 'zod'
import * as bcrypt  from 'bcrypt'

// the shape we want the new user to be
export const registerUserSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(7, { message: 'Password Must Be More Than 7 Characters Long' }).trim(),
    passwordConfirm: z.string()
    }).
    refine(data => data.password === data.passwordConfirm,
    { message: 'Password Confirm Must Match Password' })

export const loginUserSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1)
})
interface NewUser{
    email: string,
    password: string,
    passwordConfirm: string
}

export const createUser = (userData: NewUser) =>{
    const finalUserData = {
        email: userData.email,
        password: bcrypt.hashSync(userData.password, 10)        
    }

    return prisma.user.create({
        data: {
            email: finalUserData.email,
            password: finalUserData.password,
            passwords: {
                create:{
                    password: finalUserData.password
                }
            }
        }
    })
}


export const getUserByEmail = (email: string) => {
    return prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

export const verifyUser = (password: string, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

export const updateUserPasswordAttempts = (email: string) => {
    return prisma.user.update({
        where: {
            email: email
        }, data: {
            attempts:{
                increment: 1
            }
        }
    })
}

export const lockOutUser = (email: string) => {
    return prisma.user.update({
        where: {
            email: email
        }, data: {
            lockedOut: true
        }
    })
}