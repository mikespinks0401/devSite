import { prisma } from '.'


export const clearUsers = async () => {
    await prisma.password.deleteMany()
    await prisma.profile.deleteMany()
    await prisma.user.deleteMany()
}
