import prisma from "@/db";

export async function listHolders() {
  return await prisma.person.findMany({
    include: {
      heldGames: {
        include: {
          _count: true,
        },
      },
    },
  });
}
