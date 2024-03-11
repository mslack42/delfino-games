import { DsGameData } from "./types";
import prisma from "@/db";

export async function updateGame(
  gameData: DsGameData,
  gameId: number
): Promise<boolean> {
  console.log(gameData);
  let ownerId =
    gameData.ownership === "Personal" ? gameData.ownerId : undefined;
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
    holderId = ownerId;
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
