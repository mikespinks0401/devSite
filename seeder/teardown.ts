import { prisma } from '.'


export const clearUsers = () => prisma.user.deleteMany()
