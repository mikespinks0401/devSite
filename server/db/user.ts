import { prisma } from '.'
import { z } from 'zod'
import * as bcrypt  from 'bcrypt'

// the shape we want the new user to be
export const registerUserSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string().min(1),
    password: z.string().min(7, { message: 'Password Must Be More Than 7 Characters Long' }).trim(),
    passwordConfirm: z.string(),
    token: z.string()
    }).
    refine(data => data.password === data.passwordConfirm,
    { message: 'Password Confirm Must Match Password' })
interface NewUser{
    email: string,
    username: string,
    password: string,
    passwordConfirm: string
}

export const loginUserSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
    rememberMe: z.boolean().default(false),
    token: z.string().min(1)
})

export const createUser = (userData: NewUser) =>{
    const finalUserData = {
        email: userData.email,
        username: userData.username,
        password: bcrypt.hashSync(userData.password, 10)        
    }

    return prisma.user.create({
        data: {
            email: finalUserData.email,
            username: finalUserData.username,
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

export const getUserByUsername = (username: string) => {
    return prisma.user.findUnique({
        where: {
            username: username
        }
    })
}

export const getUserById = (id: string) => {
    return prisma.user.findUnique({
        where: {
            id: id
        }
    })
}

export const verifyUser = async (password: string, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

export const incrementUserPasswordAttempts = (userId: string) => {
    return prisma.user.update({
        where: {
            id: userId
        }, data: {
            attempts: {
                increment: 1
            }
        }
    })
}
export const resetUserPasswordAttempts = (userId: string) => {
    return prisma.user.update({
        where: {
            id: userId
        }, data: {
            attempts: {
                set: 0
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