import { prisma } from '.'


export const clearUsers = async () => {
    const response = await prisma.user.findMany()
    if(response.length > 0){
    await prisma.refreshToken.deleteMany()
    await prisma.password.deleteMany()
    await prisma.profile.deleteMany()
    await prisma.user.deleteMany()
    }
}
