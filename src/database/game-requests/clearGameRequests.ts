"use server";
import prisma from "@/db";

export async function clearGameRequests(gameId: number) {
  await prisma.gameRequest.deleteMany({
    where: {
      boardGameId: {
        equals: gameId,
      },
    },
  });
}
