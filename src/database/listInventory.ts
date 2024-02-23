import prisma from "@/db";
import { InventoryItem } from "./types";
import { createInventoryItemFromPrisma } from "./util/createInventoryItemFromPrisma";

export async function listInventory(
  holderName?: string
): Promise<InventoryItem[]> {
  let where = holderName
    ? {
        where: {
          dsData: {
            holder: {
              is: {
                name: holderName,
              },
            },
          },
        },
      }
    : undefined;

  const data = await prisma.boardGame.findMany({
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
    ...where,
  });

  return data.map((r) => createInventoryItemFromPrisma(r));
}


