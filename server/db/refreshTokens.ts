import {prisma} from '.'

export const createRefreshToken = (token, id) => {
    return prisma.refreshToken.create({
        data:{
            token: token,
            userId: id
        }
    })
}