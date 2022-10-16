import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'

const prisma = new PrismaClient()

const admin_email = process.env.ADMIN_EMAIL
const admin_password = hashSync(process.env.ADMIN_PASSWORD, 10)


//Seeds DB with admin user
const main = async() => {
    const user = await prisma.user.create({
        data: {

            email: admin_email,
            password: admin_password,
            role: 'ADMIN',
            passwords: {
                create:{
                    password: admin_password
                }
            }
        }
    })
    console.log(user)
}

main().catch(e => {
    console.error(e)
    process.exit(1)
}).finally(async ()=>{
    await prisma.$disconnect();
})