import { prisma } from '.' 
import { faker } from '@faker-js/faker'

//reference for user data
type User = {
    email: String
    password: String

}

export const createUsers = async (numberOfUsers: number = 10) => {
    const users = []
    for(let i = 0; i <= numberOfUsers; i++){
        let user: User = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        users.push(user)
    }

        await prisma.user.createMany({
            data: users
        })     


}