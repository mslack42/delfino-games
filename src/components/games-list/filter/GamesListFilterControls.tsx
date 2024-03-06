import { InventoryItem } from "@/database/types";
import { useContext, useState } from "react";
import { FilterBubbleData } from "../../input/FilterBubbleBucket";
import { BubbleFilterInput } from "./controls/BubbleFilterInput";
import { FilterState } from "./types";
import { filterData } from "./util/filterData";
import { PlayerCountSlider } from "./controls/PlayerCountSlider";
import { DurationSlider } from "./controls/DurationSlider";
import { GameTextFilter } from "./controls/GameTextFilter";
import { LeftSheet } from "@/components/common/LeftSheet";
import { BooleanFilter } from "./controls/BooleanFilter";
import { initialFilterState } from "./util/initialFilterState";
import { extractOffices } from "./util/extractOffices";
import { extractDurationRange } from "./util/extractDurationRange";
import { extractPlayerCountRange } from "./util/extractPlayerCountRange";
import { extractTags } from "./util/extractTags";
import { extractHolders } from "./util/extractHolders";
import { GamesListContext } from "../GamesListContext";
import { GamesFilterContext } from "./GamesFilterContext";

export function GamesListFilterControls() {
  const { inventoryData, controlsKeys, setFilterMethod } =
    useContext(GamesListContext);

  const offices: FilterBubbleData[] = extractOffices(inventoryData);
  const holders: FilterBubbleData[] = extractHolders(inventoryData);
  const tags: FilterBubbleData[] = extractTags(inventoryData);
  const playerCountRange: number[] = extractPlayerCountRange(inventoryData);
  const durationRange: number[] = extractDurationRange(inventoryData);

  const [filterState, _setFilterState] = useState<FilterState>({
    ...initialFilterState,
    bubbleTypeFilters: {
      ...initialFilterState.bubbleTypeFilters,
      office: {
        ...initialFilterState.bubbleTypeFilters.office,
        values: offices.map((o) => o.data as string),
      },
      holders: {
        ...initialFilterState.bubbleTypeFilters.holders,
        values: holders.map((o) => o.data as string),
      },
      tags: {
        ...initialFilterState.bubbleTypeFilters.tags,
        values: [],
      },
    },
  });
  const setFilterState = (newState: FilterState) => {
    _setFilterState(newState);
    setFilterMethod(() => (lst: InventoryItem[]) => {
      if (!!lst) {
        return filterData(newState, controlsKeys)(lst);
      } else {
        return lst;
      }
    });
  };

  return (
    <GamesFilterContext.Provider value={{ filterState, setFilterState }}>
      <LeftSheet
        head={
          <h2 className="text-xl rounded border-2 border-black p-1">
            Filters...
          </h2>
        }
        content={
          <div className="border border-black">
            {controlsKeys.includes("office") && offices.length > 1 && (
              <BubbleFilterInput
                filterName="Office"
                filterKey="office"
                allOptions={offices}
              />
            )}
            {controlsKeys.includes("holders") && holders.length > 1 && (
              <BubbleFilterInput
                filterName="Holders"
                filterKey="holders"
                allOptions={holders}
              />
            )}
            {controlsKeys.includes("inrotation") && (
              <BooleanFilter
                filterName="Only show games in current rotation?"
                filterKey="inrotation"
              />
            )}
            {controlsKeys.includes("tags") && (
              <BubbleFilterInput
                filterName="Tags"
                filterKey="tags"
                allOptions={tags}
              />
            )}
            {controlsKeys.includes("playercount") && (
              <PlayerCountSlider range={playerCountRange as [number, number]} />
            )}
            {controlsKeys.includes("duration") && (
              <DurationSlider range={durationRange as [number, number]} />
            )}
            {controlsKeys.includes("name") && <GameTextFilter />}
          </div>
        }
      />
    </GamesFilterContext.Provider>
  );
}
