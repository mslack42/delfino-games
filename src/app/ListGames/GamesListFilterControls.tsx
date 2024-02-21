import { InventoryItem } from "@/database/types";
import { useState } from "react";
import { dedupe } from "../../util/dedupe";
import {
  FilterBubbleData,
} from "../../components/input/FilterBubbleBucket";
import { BubbleFilterInput } from "../../components/input/BubbleFilterInput";

type Props = {
  gamesList: InventoryItem[];
  onFilterChange: (filteredList: InventoryItem[]) => void;
};

export type BubbleTypeFilter = {
  filterOn: boolean;
  values: string[];
};

export type FilterState = {
  bubbleTypeFilters: {
    office: BubbleTypeFilter;
    holders: BubbleTypeFilter;
    [key: string]: BubbleTypeFilter;
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
  },
};

const applyBubbleTypeFilter = (
  filterState: FilterState,
  filterKey: string,
  value: string
) => {
  if (!filterState?.bubbleTypeFilters[filterKey].filterOn) {
    return true;
  }
  return filterState.bubbleTypeFilters[filterKey].values.includes(
    value
  );
};
const filterData = (filterState: FilterState) => {
  return (data: InventoryItem[]) =>
    data
      .filter((g) => applyBubbleTypeFilter(filterState, "office", g.dsData.location))
      .filter((g) => applyBubbleTypeFilter(filterState, "holders", g.dsData.holder));
};

export function GamesListFilterControls(props: Props) {
  const onFilterChange = props.onFilterChange;
  const gamesList = props.gamesList;

  const offices: FilterBubbleData[] = dedupe(
    gamesList.map((g) => g.dsData.location)
  ).map((d) => {
    return {
      name: d,
      data: d,
    };
  });
  const holders: FilterBubbleData[] = dedupe(
    gamesList.map((g) => g.dsData.holder)
  ).map((d) => {
    return {
      name: d,
      data: d,
    };
  });

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
      }
    },
  });
  const setFilterState = (newState: FilterState) => {
    _setFilterState(newState), onFilterChange(filterData(newState)(gamesList));
  };

  return (
    <>
      <form className="border border-black">
        <BubbleFilterInput
          filterName="Office"
          filterState={filterState}
          setFilterState={setFilterState}
          filterKey="office"
          allOptions={offices}
        />
        <BubbleFilterInput
          filterName="Holders"
          filterState={filterState}
          setFilterState={setFilterState}
          filterKey="holders"
          allOptions={holders}
        />
      </form>
    </>
  );
}


