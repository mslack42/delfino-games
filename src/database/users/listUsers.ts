import prisma from '@/db'

export async function listUsers() {
    return await prisma.user.findMany({
        include: {
            accounts: true
        }
    })
}