import prisma from "@/db";

export async function deleteGame(gameId: number) {
  return await prisma?.boardGame.delete({
    where: {
      id: gameId,
    },
  });
}
