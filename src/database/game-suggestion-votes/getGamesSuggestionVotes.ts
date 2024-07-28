import { GameSuggestionVote } from "@/components/game-suggestion-votes/GameSuggestionVoteContext";
import prisma from "@/db";

export async function getGamesSuggestionVotes(): Promise<GameSuggestionVote[]> {
  const allVotes = await prisma.gameSuggestionVote.findMany({
    include: {
      suggestion: true,
      user: true,
    },
  });

  const output: GameSuggestionVote[] = allVotes.map((db) => {
    return {
      bggGameId: db.suggestion.bggId,
      user: {
        name: db.user.name,
        id: db.user.id,
      },
    };
  });

  return output;
}
