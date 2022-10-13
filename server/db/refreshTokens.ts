import {prisma} from '.'

export const getTokenByToken = (token) =>{
    return prisma.refreshToken.findUnique({
        where: {
            token
        }
    })
}

export const createRefreshToken = (token, id) => {
    return prisma.refreshToken.create({
        data:{
            token: token,
            userId: id
        }
    })
}

export const deleteToken = (token) => {
    return prisma.refreshToken.delete({
        where: {
            token
        }
    })
}