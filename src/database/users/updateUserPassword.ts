import prisma from "@/db";

export async function updateUserPassword(id: string, password: string) {
  return await prisma?.user.update({
    where: {
      id: id,
    },
    data: {
      password: password,
    },
    include: {
      _count: true,
    },
  });
}
