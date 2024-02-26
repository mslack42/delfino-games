import { InventoryItem } from "@/database/types";
import { FilterState, ControlsKey } from "../types";
import { applyBubbleTypeFilter } from "./applyBubbleTypeFilter";

export const filterData = (
  filterState: FilterState,
  controlsKeys: ControlsKey[]
) => {
  return (data: InventoryItem[]) =>
    data
      .filter((g) =>
        controlsKeys.includes("office")
          ? applyBubbleTypeFilter(filterState, "office", g.dsData.location)
          : g
      )
      .filter((g) =>
        controlsKeys.includes("holders")
          ? applyBubbleTypeFilter(filterState, "holders", g.dsData.holder)
          : g
      )
      .filter((g) =>
        controlsKeys.includes("tags")
          ? g.bggData.specs.tags.some((t) =>
              applyBubbleTypeFilter(filterState, "tags", t)
            )
          : g
      )
      .filter((g) =>
        controlsKeys.includes("playercount") &&
        filterState.sliderTypeFilters["playercount"].filterOn
          ? (!g.bggData.specs.maxPlayerCount ||
              g.bggData.specs.maxPlayerCount >=
                filterState.sliderTypeFilters["playercount"].lower) &&
            (!g.bggData.specs.minPlayerCount ||
              g.bggData.specs.minPlayerCount <=
                filterState.sliderTypeFilters["playercount"].upper)
          : g
      );
};
