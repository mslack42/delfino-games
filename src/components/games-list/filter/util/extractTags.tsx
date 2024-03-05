import { InventoryItem } from "@/database/types";
import { dedupe } from "../../../../util/dedupe";
import { FilterBubbleData } from "../../../input/FilterBubbleBucket";
import { sortBubbleData } from "./sortBubbleData";

export function extractTags(gamesList: InventoryItem[]): FilterBubbleData[] {
  return sortBubbleData(
    dedupe(gamesList.map((g) => g.bggData.specs.tags).flat()).map((d) => {
      return {
        name: d,
        data: d,
      };
    })
  );
}
