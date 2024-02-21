import { FilterBubbleData, FilterBubbleBucket } from "./FilterBubbleBucket";
import {
  FilterState,
  BubbleTypeFilter,
} from "../../app/ListGames/GamesListFilterControls";

export type BubbleFilterInput = {
  filterName: string;
  filterState: FilterState;
  setFilterState: (newState: FilterState) => void;
  filterKey: string;
  allOptions: FilterBubbleData[];
};
export function BubbleFilterInput(props: BubbleFilterInput) {
  const { filterName, filterState, filterKey, setFilterState, allOptions } =
    props;

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

  return (
    <div>
      <label>
        <b>{filterName}: </b>
      </label>
      <input
        type="checkbox"
        checked={filterState.bubbleTypeFilters[filterKey].filterOn}
        onChange={() => {
          setFilterState({
            ...filterState,
            bubbleTypeFilters: {
              ...filterState.bubbleTypeFilters,
              [filterKey]: {
                ...filterState.bubbleTypeFilters[filterKey],
                filterOn: !filterState.bubbleTypeFilters[filterKey].filterOn,
              },
            },
          });
        }}
      />
      {filterState.bubbleTypeFilters[filterKey].filterOn ? (
        <FilterBubbleBucket
          allValues={allOptions}
          selectedValues={filterState.bubbleTypeFilters[filterKey].values}
          enabled={filterState.bubbleTypeFilters[filterKey].filterOn}
          toggleFn={filterBubbleToggle(filterKey)}
        />
      ) : undefined}
    </div>
  );
}
