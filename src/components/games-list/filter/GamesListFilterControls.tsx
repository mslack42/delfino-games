import { InventoryItem } from "@/database/types";
import { useState } from "react";
import { FilterBubbleData } from "../../input/FilterBubbleBucket";
import { BubbleFilterInput } from "../../input/BubbleFilterInput";
import { FilterState, ControlsKey } from "../types";
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

type Props = {
  gamesList: InventoryItem[];
  onFilterChange: (filteredList: InventoryItem[]) => void;
  controlsKeys: ControlsKey[];
};
export function GamesListFilterControls(props: Props) {
  const { onFilterChange, gamesList } = props;

  const offices: FilterBubbleData[] = extractOffices(gamesList);
  const holders: FilterBubbleData[] = extractHolders(gamesList);
  const tags: FilterBubbleData[] = extractTags(gamesList);
  const playerCountRange: number[] = extractPlayerCountRange(gamesList);
  const durationRange: number[] = extractDurationRange(gamesList);

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
    _setFilterState(newState),
      onFilterChange(filterData(newState, props.controlsKeys)(gamesList));
  };

  return (
    <LeftSheet
      head={
        <h2 className="text-xl rounded border-2 border-black p-1">
          Filters...
        </h2>
      }
      content={
        <div className="border border-black">
          {props.controlsKeys.includes("office") && offices.length > 1 && (
            <BubbleFilterInput
              filterName="Office"
              filterState={filterState}
              setFilterState={setFilterState}
              filterKey="office"
              allOptions={offices}
            />
          )}
          {props.controlsKeys.includes("holders") && holders.length > 1 && (
            <BubbleFilterInput
              filterName="Holders"
              filterState={filterState}
              setFilterState={setFilterState}
              filterKey="holders"
              allOptions={holders}
            />
          )}
          {props.controlsKeys.includes("inrotation") && (
            <BooleanFilter
              filterName="Only show games in current rotation?"
              filterState={filterState}
              setFilterState={setFilterState}
              filterKey="inrotation"
            />
          )}
          {props.controlsKeys.includes("tags") && (
            <BubbleFilterInput
              filterName="Tags"
              filterState={filterState}
              setFilterState={setFilterState}
              filterKey="tags"
              allOptions={tags}
            />
          )}
          {props.controlsKeys.includes("playercount") && (
            <PlayerCountSlider
              filterState={filterState}
              setFilterState={setFilterState}
              range={playerCountRange as [number, number]}
            />
          )}
          {props.controlsKeys.includes("duration") && (
            <DurationSlider
              filterState={filterState}
              setFilterState={setFilterState}
              range={durationRange as [number, number]}
            />
          )}
          {props.controlsKeys.includes("name") && (
            <GameTextFilter
              filterState={filterState}
              setFilterState={setFilterState}
            />
          )}
        </div>
      }
    />
  );
}
