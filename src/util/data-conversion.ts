import { BggSummaryData } from "@/bgg/types";
import { InventoryItem } from "@/database/types";

export function createBggDataSummaryFromInventoryItem(
  item: InventoryItem
): BggSummaryData {
  const output: BggSummaryData = {
    name: item.name,
    bggId: item.bggData.bggId,
    thumb: item.bggData.thumb,
    image: item.bggData.image,
    description: item.bggData.description,
    boardGameDataSpecs: {
      rank: item.bggData.stats.rank ?? undefined,
      score: item.bggData.stats.score ?? undefined,
    },
    boardGameBggDataStats: {
      minplayers: item.bggData.specs.minPlayerCount ?? undefined,
      maxplayers: item.bggData.specs.maxPlayerCount ?? undefined,
      minplaytime_minutes: item.bggData.specs.minPlayTime ?? undefined,
      maxplaytime_minutes: item.bggData.specs.maxPlayTime ?? undefined,
      tags: item.bggData.specs.tags,
    },
  };

  return output;
}
