import prisma from "@/db";
import { InventoryItem } from "./types";

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

  return data.map((r) => {
    return {
      bggData: {
        bggId: r.bggData?.bggId!,
        description: r.bggData?.description,
        image: r.bggData?.image,
        thumb: r.bggData?.thumb,
        specs: {
          maxPlayerCount: r.bggData?.specs.maxplayers,
          minPlayerCount: r.bggData?.specs.minplayers,
          maxPlayTime: r.bggData?.specs.maxplaytime_minutes,
          minPlayTime: r.bggData?.specs.minplaytime_minutes,
          tags: r.bggData?.specs.tags ?? [],
        },
        stats: {
          score: r.bggData?.stats.bggAverageScore,
          rank: r.bggData?.stats.bggRank,
        },
        lastUpdated: r.bggData?.lastUpdate,
      },
      name: r.name,
      id: r.id,
      dsData: {
        holder: r.dsData?.holder.name!,
        inRotation: r.dsData?.inCurrentRotation!,
        location: r.dsData?.location!,
        ownership: r.dsData?.ownership!,
      },
    };
  });
}
