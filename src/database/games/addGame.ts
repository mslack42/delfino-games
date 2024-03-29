"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/db";
import { NewGameData } from "./types";

export async function addGame(newData: NewGameData): Promise<boolean> {
  let ownerId = newData.ownership === "Personal" ? newData.ownerId : undefined;
  if (ownerId === -1) {
    const newOwner = await prisma.person.create({
      data: {
        name: newData.newOwner!,
        location: newData.location,
      },
    });
    ownerId = newOwner.id;
  }

  let holderId = newData.holderId;
  if (newData.holderId === -2 && newData.ownership === "Personal") {
    holderId = ownerId;
  }
  if (newData.holderId === -1) {
    const newHolder = await prisma.person.create({
      data: {
        name: newData.newHolder!,
        location: newData.location,
      },
    });
    holderId = newHolder.id;
  }

  try {
    let game: Prisma.BoardGameCreateInput = {
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
        },
      },
      name: newData.bggData.name,
      dsData: {
        create: {
          holder: {
            connect: {
              id: holderId,
            },
          },
          owner: ownerId
            ? {
                connect: {
                  id: ownerId,
                },
              }
            : undefined,
          ownership: newData.ownership,
          inCurrentRotation: newData.isInRotation,
          ownedExpansions: {
            createMany: {
              data: (newData.bggData.expansions ?? []).map((ex) => {
                return {
                  bggId: ex.bggId,
                  description: ex.description!,
                  image: ex.image!,
                  thumb: ex.thumb!,
                  name: ex.name,
                };
              }),
            },
          },
        },
      },
      GameRequest: undefined,
    };
    await prisma.boardGame.create({
      data: game,
    });
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
}
