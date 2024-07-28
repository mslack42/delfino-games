import { GameSuggestion } from "@/components/game-suggestions/GameSuggestionContext";
import prisma from "@/db";

export async function getGamesSuggestions(): Promise<GameSuggestion[]> {
  const allSuggestions = await prisma.gameSuggestion.findMany({
    include: {
      suggestedBy: true,
    },
  });

  const output: GameSuggestion[] = allSuggestions.map((db) => {
    return {
      game: {
        id: db.id,
        bggId: db.bggId,
        description: db.description,
        image: db.image,
        name: db.name,
        thumb: db.thumb,
        type: db.boxType == "BoardGame" ? "boardgame" : "expansion",
      },
      user: {
        id: db.suggestedBy.id,
        name: db.suggestedBy.name,
      },
    };
  });

  return output;
}
