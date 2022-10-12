import { prisma } from '.'


export const clearUsers = async () => {
    if(process.env.ENVIRONMENT !== 'development'){
        return
    }
    const response = await prisma.user.findMany()
    if(response.length > 0){
    await prisma.refreshToken.deleteMany()
    await prisma.password.deleteMany()
    await prisma.profile.deleteMany()
    await prisma.user.deleteMany()
    }
}
