"use server";
import { BggSearchResult } from "@/bgg/types";
import prisma from "@/db";

export async function toggleGameSuggestion(
  bggSearchResult: BggSearchResult,
  userId: string,
  nowSuggested: boolean
) {
  if (nowSuggested) {
    await prisma.gameSuggestion.create({
      data: {
        bggId: bggSearchResult.bggId,
        boxType:
          bggSearchResult.type == "boardgame" ? "BoardGame" : "Expansion",
        description: bggSearchResult.description ?? "",
        image: bggSearchResult.image ?? "",
        thumb: bggSearchResult.thumb ?? "",
        name: bggSearchResult.name,
        suggestedByUserId: userId,
      },
    });
  } else {
    await prisma.gameSuggestion.deleteMany({
      where: {
        AND: [
          {
            bggId: {
              equals: bggSearchResult.bggId,
            },
          },
          {
            suggestedByUserId: {
              equals: userId,
            },
          },
        ],
      },
    });
  }
}
