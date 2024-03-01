import prisma from "@/db";
import { UserRole } from "@prisma/client";

export async function updateUser(id:string, name:string,email:string, role?: UserRole) {
    await prisma?.user.update({
        where: {
            id: id
        },
        data: {
            name: {
                set: name
            },
            email: {
                set: email
            },
            accounts: role ? {
                updateMany: {
                  where: {
                    userId: id,
                  },
                  data: {
                    role: role as UserRole,
                  },
                },
              } : undefined,
        }
    })
}