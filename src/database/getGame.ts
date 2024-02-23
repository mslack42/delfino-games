import prisma from "@/db";
import { InventoryItem } from "./types";
import { createInventoryItemFromPrisma } from "./util/createInventoryItemFromPrisma";

export async function getInventoryItem(gameId: number): Promise<InventoryItem> {
    const data = await prisma.boardGame.findFirstOrThrow({
        include: {
          bggData: {
            include: {
              specs: true,
              stats: true,
            },
          },
          dsData: {
            include: {
              holder: true,
              specs: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
        where: {
            id: {
                equals: gameId
            }
        }
      });

      return createInventoryItemFromPrisma(data)
}