import {prisma } from '.'


export const createPasswordResetToken = ({token, userId, secret}) => {
    return prisma.resetPasswordToken.create({
        data: {
            token: token,
            userId: userId,
            secret: secret
        }
    })
}