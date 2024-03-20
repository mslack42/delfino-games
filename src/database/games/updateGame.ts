import { BggExpansionSummaryData } from "@/bgg/types";
import { DsGameData } from "./types";
import prisma from "@/db";

export async function updateGame(
  gameData: DsGameData,
  gameId: number,
  expansions: BggExpansionSummaryData[]
): Promise<boolean> {
  let ownerId = gameData.ownership === "Personal" ? gameData.ownerId : null;
  if (ownerId === -1) {
    const newOwner = await prisma.person.create({
      data: {
        name: gameData.newOwner!,
        location: gameData.location,
      },
    });
    ownerId = newOwner.id;
  }

  let holderId = gameData.holderId;
  if (gameData.holderId === -2 && gameData.ownership === "Personal") {
    holderId = ownerId!;
  }
  if (gameData.holderId === -1) {
    const newHolder = await prisma.person.create({
      data: {
        name: gameData.newHolder!,
        location: gameData.location,
      },
    });
    holderId = newHolder.id;
  }

  try {
    await prisma.boardGame.update({
      where: {
        id: gameId,
      },
      data: {
        dsData: {
          update: {
            holderId: holderId,
            ownerId: ownerId,
            inCurrentRotation: gameData.isInRotation,
            ownership: gameData.ownership,
            ownedExpansions: {
              // It's a bit of a hack, but delete and re-create is the first thing that I've managed to get working...
              deleteMany: {},
              upsert: expansions.map((ex) => {
                return {
                  where: {
                    singleOccurenceOfEachExpansionPerGameInstance: {
                      bggId: ex.bggId,
                      boardGameInternalDataId: gameId,
                    },
                  },
                  update: {},
                  create: {
                    bggId: ex.bggId,
                    description: ex.description!,
                    image: ex.image!,
                    thumb: ex.thumb!,
                    name: ex.name!,
                  },
                };
              }),
            },
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
