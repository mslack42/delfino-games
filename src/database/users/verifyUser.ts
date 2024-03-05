import prisma from "@/db";

export async function verifyUser(userId: string) {
  return await prisma.user.update({
    data: {
      accounts: {
        updateMany: {
          where: {
            role: "Unverified",
          },
          data: {
            role: "Verified",
          },
        },
      },
    },
    where: {
      id: userId,
      accounts: {
        every: {
          role: "Unverified",
        },
      },
    },
    include: {
      _count: true,
    },
  });
}
