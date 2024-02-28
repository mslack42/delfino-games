import prisma from "@/db"

export async function deleteHolderRecord(holderId:number) {
    return await prisma?.person.delete({
        where: {
            id: holderId
        }
    })
}