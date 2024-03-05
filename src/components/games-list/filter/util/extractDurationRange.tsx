import { InventoryItem } from "@/database/types";

export function extractDurationRange(gamesList: InventoryItem[]): number[] {
  return gamesList
    .map((g) => {
      return [g.bggData.specs.minPlayTime, g.bggData.specs.maxPlayTime];
    })
    .reduce(
      (a, b) => {
        const vals = a.concat(b).filter((v) => v) as number[];
        return [Math.min(...vals), Math.min(Math.max(...vals), 120)];
      },
      [null, null]
    ) as number[];
}
