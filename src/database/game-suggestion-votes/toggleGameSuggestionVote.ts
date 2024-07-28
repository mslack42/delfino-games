"use server";
import prisma from "@/db";

export async function toggleGameSuggestionVote(
  bggId: number,
  userId: string,
  nowSuggested: boolean
) {
  const gameSuggestion = await prisma.gameSuggestion.findFirst({
    where: {
      bggId: bggId,
    },
  });

  if (nowSuggested) {
    await prisma.gameSuggestionVote.create({
      data: {
        suggestionId: gameSuggestion?.id!,
        userId: userId,
      },
    });
  } else {
    await prisma.gameSuggestionVote.deleteMany({
      where: {
        AND: [
          {
            suggestionId: {
              equals: gameSuggestion?.id!,
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
