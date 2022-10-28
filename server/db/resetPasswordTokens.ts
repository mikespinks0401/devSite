import {prisma } from '.'


export const createPasswordResetToken = (dbToken, secret:string) => {
    const {token, userId} = dbToken

    return prisma.resetPasswordToken.create({
        data: {
            token: token,
            userId: userId,
            secret: secret
        }
    })
}