"use server";
import prisma from "@/db";

export async function toggleGameRequest(
  gameId: number,
  userId: string,
  nowRequested: boolean
) {
  if (nowRequested) {
    await prisma.gameRequest.create({
      data: {
        userId: userId,
        boardGameId: gameId,
      },
    });
  } else {
    await prisma.gameRequest.deleteMany({
      where: {
        AND: [
          {
            boardGameId: {
              equals: gameId,
            },
          },
          {
            userId: {
              equals: userId,
            },
          },
        ],
      },
    });
  }
}
