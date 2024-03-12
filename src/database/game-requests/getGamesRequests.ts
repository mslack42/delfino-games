import { GameRequest } from "@/components/game-requests/GameRequestContext";
import prisma from "@/db";
export async function getGamesRequests(): Promise<GameRequest[]> {
  const allRequests = await prisma.gameRequest.findMany({
    include: {
      user: true,
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
