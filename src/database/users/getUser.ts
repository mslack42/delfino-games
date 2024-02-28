import prisma from '@/db'

export async function getUser(userId:string) {
    return await prisma.user.findFirst({
        where: {
            id: {
                equals: userId
            }
        },
        include: {
            accounts: true,
            GameRequest: true
        }
    })
}