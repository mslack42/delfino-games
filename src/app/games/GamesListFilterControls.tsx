import { InventoryItem } from "@/database/types";
import { useState } from "react";
import { dedupe } from "../../util/dedupe";
import { FilterBubbleData } from "../../components/input/FilterBubbleBucket";
import { BubbleFilterInput } from "../../components/input/BubbleFilterInput";

export type ControlsKey = BubbleTypeFilterKey;
type BubbleTypeFilterKey = "office" | "holders" | "tags";
type Props = {
  gamesList: InventoryItem[];
  onFilterChange: (filteredList: InventoryItem[]) => void;
  controlsKeys: ControlsKey[];
};

export type BubbleTypeFilter = {
  filterOn: boolean;
  values: string[];
};

export type FilterState = {
  bubbleTypeFilters: {
    [key in BubbleTypeFilterKey as string]: BubbleTypeFilter;
  };
  filterOnDuration: boolean;
  minDuration: number;
  maxDuration: number;
  filterOnPlayerCount: boolean;
  minPlayerCount: number;
  maxPlayerCount: number;
};
const initialFilterState: FilterState = {
  filterOnDuration: false,
  minDuration: 0,
  maxDuration: 999,
  filterOnPlayerCount: false,
  minPlayerCount: 0,
  maxPlayerCount: 99,
  bubbleTypeFilters: {
    office: {
      filterOn: false,
      values: [],
    },
    holders: {
      filterOn: false,
      values: [],
    },
    tags: {
      filterOn: false,
      values: [],
    },
  },
};

const applyBubbleTypeFilter = (
  filterState: FilterState,
  filterKey: BubbleTypeFilterKey,
  value: string
) => {
  if (!filterState?.bubbleTypeFilters[filterKey].filterOn) {
    return true;
  }
  return filterState.bubbleTypeFilters[filterKey].values.includes(value);
};

const filterData = (filterState: FilterState, controlsKeys: ControlsKey[]) => {
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
      );
};

function sortBubbleData(data: FilterBubbleData[]) {
  let newData = [...data];
  newData.sort((a, b) => a.name.localeCompare(b.name));
  return newData;
}

export function GamesListFilterControls(props: Props) {
  const onFilterChange = props.onFilterChange;
  const gamesList = props.gamesList;

  const offices: FilterBubbleData[] = sortBubbleData(
    dedupe(gamesList.map((g) => g.dsData.location)).map((d) => {
      return {
        name: d,
        data: d,
      };
    })
  );
  const holders: FilterBubbleData[] = sortBubbleData(
    dedupe(gamesList.map((g) => g.dsData.holder)).map((d) => {
      return {
        name: d,
        data: d,
      };
    })
  );
  const tags: FilterBubbleData[] = sortBubbleData(
    dedupe(gamesList.map((g) => g.bggData.specs.tags).flat()).map((d) => {
      return {
        name: d,
        data: d,
      };
    })
  );

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
    <>
      <div className="border border-black">
        {props.controlsKeys.includes("office") && (
          <BubbleFilterInput
            filterName="Office"
            filterState={filterState}
            setFilterState={setFilterState}
            filterKey="office"
            allOptions={offices}
          />
        )}
        {props.controlsKeys.includes("holders") && (
          <BubbleFilterInput
            filterName="Holders"
            filterState={filterState}
            setFilterState={setFilterState}
            filterKey="holders"
            allOptions={holders}
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
      </div>
    </>
  );
}
