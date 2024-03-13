import { FilterState, BubbleTypeFilter } from "../types";
import {
  FilterBubbleData,
  FilterBubbleBucket,
} from "../../../input/FilterBubbleBucket";
import { useContext } from "react";
import { GamesFilterContext } from "../GamesFilterContext";

export type BubbleFilterInput = {
  filterName: string;
  filterKey: string;
  allOptions: FilterBubbleData[];
  noSelectAllNone?: boolean;
};
export function BubbleFilterInput(props: BubbleFilterInput) {
  const { filterKey, allOptions } = props;
  const { filterState, setFilterState } = useContext(GamesFilterContext);

  const filterBubbleToggle = (key: string) => {
    return (toggledValue: string) => {
      const bubbleTypeFilter: BubbleTypeFilter = filterState.bubbleTypeFilters[
        key
      ] as BubbleTypeFilter;
      let newState: FilterState;
      if (bubbleTypeFilter.values.includes(toggledValue)) {
        newState = {
          ...filterState,
          bubbleTypeFilters: {
            ...filterState.bubbleTypeFilters,
            [key]: {
              ...bubbleTypeFilter,
              values: bubbleTypeFilter.values.filter((v) => v !== toggledValue),
            },
          },
        };
      } else {
        newState = {
          ...filterState,
          bubbleTypeFilters: {
            ...filterState.bubbleTypeFilters,
            [key]: {
              ...bubbleTypeFilter,
              values: [...bubbleTypeFilter.values, toggledValue],
            },
          },
        };
      }
      setFilterState(newState);
    };
  };

  const toggleAll = (key: string) => {
    return (newValue: boolean) => {
      let thisBubbleTypeFilter = {
        ...filterState.bubbleTypeFilters[key],
      } as BubbleTypeFilter;
      if (newValue) {
        thisBubbleTypeFilter.values = allOptions.map((ao) => ao.data);
      } else {
        thisBubbleTypeFilter.values = [];
      }
      setFilterState({
        ...filterState,
        bubbleTypeFilters: {
          ...filterState.bubbleTypeFilters,
          [key]: {
            ...thisBubbleTypeFilter,
          },
        },
      });
    };
  };

  return (
    <div>
      <FilterBubbleBucket
        allValues={allOptions}
        selectedValues={filterState.bubbleTypeFilters[filterKey].values}
        enabled={filterState.bubbleTypeFilters[filterKey].filterOn}
        toggleFn={filterBubbleToggle(filterKey)}
        toggleAllFn={!props.noSelectAllNone ? toggleAll(filterKey) : undefined}
      />
    </div>
  );
}
