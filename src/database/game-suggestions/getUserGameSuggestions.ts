import { BggSearchResult } from "@/bgg/types";
import prisma from "@/db";

export async function getUserGameSuggestions(userId: string) {
  const suggestions = await prisma.gameSuggestion.findMany({
    include: {
      suggestedBy: true,
    },
    where: {
      suggestedByUserId: userId,
    },
  });

  const output: BggSearchResult[] = suggestions.map((db) => {
    return {
      name: db.name,
      bggId: db.bggId,
      description: db.description,
      image: db.image,
      thumb: db.thumb,
      type: db.boxType == "BoardGame" ? "boardgame" : "expansion",
    };
  });

  return output;
}
