"use server";
import prisma from "@/db";

export async function changeRotationStatus(
  gameId: number,
  newRotationStatus: boolean
) {
  await prisma?.boardGame.update({
    where: {
      id: gameId,
    },
    data: {
      dsData: {
        update: {
          inCurrentRotation: newRotationStatus,
        },
      },
    },
  });
}
