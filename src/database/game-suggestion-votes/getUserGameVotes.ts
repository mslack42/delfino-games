import { GameSuggestionVote } from "@/components/game-suggestion-votes/GameSuggestionContext";
import prisma from "@/db";

export async function getUserGameVotes(userId: string) {
  const allVotes = await prisma.gameSuggestionVote.findMany({
    include: {
      user: true,
      suggestion: true,
    },
    where: {
      userId: userId,
    },
  });

  const output: GameSuggestionVote[] = allVotes.map((db) => {
    return {
      user: {
        id: db.userId,
        name: db.user.name,
      },
      bggGameId: db.suggestion.bggId,
    };
  });

  return output;
}
