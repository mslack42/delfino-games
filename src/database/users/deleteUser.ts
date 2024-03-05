import prisma from "@/db";

export async function deleteUser(userId: string) {
  await prisma?.user.delete({
    where: {
      id: userId,
    },
  });
}
