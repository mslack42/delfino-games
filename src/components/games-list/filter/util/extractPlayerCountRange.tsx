import { InventoryItem } from "@/database/types";

export function extractPlayerCountRange(gamesList: InventoryItem[]): number[] {
  return gamesList
    .map((g) => {
      return [g.bggData.specs.minPlayerCount, g.bggData.specs.maxPlayerCount];
    })
    .reduce(
      (a, b) => {
        const vals = a.concat(b).filter((v) => v) as number[];
        return [Math.min(...vals), Math.min(Math.max(...vals), 12)];
      },
      [null, null]
    ) as number[];
}
