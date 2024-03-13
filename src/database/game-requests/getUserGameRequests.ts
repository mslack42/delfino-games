import { GameRequest } from "@/components/game-requests/GameRequestContext";
import prisma from "@/db";

export async function getUserGameRequests(userId: string) {
  const allRequests = await prisma.gameRequest.findMany({
    include: {
      user: true,
    },
    where: {
      userId: userId,
    },
  });

  const output: GameRequest[] = allRequests.map((db) => {
    return {
      game: {
        id: db.boardGameId,
      },
      user: {
        id: db.userId,
        name: db.user.name,
      },
    };
  });

  return output;
}
