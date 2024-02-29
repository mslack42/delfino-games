"use server";
import { BggSummaryData } from "@/bgg/types";
import { Location, Ownership,  } from "@prisma/client";
import prisma from "@/db";

export type NewGameData = {
  bggData: BggSummaryData;
  ownership: Ownership;
  location: Location;
  holderId?: number;
  newHolder?: string;
};

export async function addGame(newData: NewGameData): Promise<boolean> {
  let holderId = newData.holderId;
  if (!newData.holderId || newData.holderId === -1) {
    const newHolder = await prisma.person.create({
      data: {
        name: newData.newHolder!,
        location: newData.location
      },
    });
    holderId = newHolder.id;
  }

  try {
    await prisma.boardGame.create({
      data: {
        bggData: {
          create: {
            bggId: newData.bggData.bggId,
            image: newData.bggData.image ?? "",
            thumb: newData.bggData.thumb ?? "",
            description: newData.bggData.description ?? "",
            specs: {
              create: {
                maxplaytime_minutes:
                  newData.bggData.boardGameBggDataStats.maxplaytime_minutes!,
                minplaytime_minutes:
                  newData.bggData.boardGameBggDataStats.minplaytime_minutes!,
                maxplayers: newData.bggData.boardGameBggDataStats.maxplayers!,
                minplayers: newData.bggData.boardGameBggDataStats.minplayers!,
                externalDataId: newData.bggData.bggId,
                tags: newData.bggData.boardGameBggDataStats.tags,
              },
            },
            stats: {
              create: {
                bggAverageScore: newData.bggData.boardGameDataSpecs.score,
                bggRank: newData.bggData.boardGameDataSpecs.rank,
                bggId: newData.bggData.bggId,
              },
            },
            boardGameId: newData.bggData.bggId,
          },
        },
        name: newData.bggData.name,
        dsData: {
          create: {
            boardGameId: newData.bggData.bggId,
            holder: {
              connect: {
                id: holderId,
              },
            },
            ownership: newData.ownership,
          },
        },
      },
    });
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
}
