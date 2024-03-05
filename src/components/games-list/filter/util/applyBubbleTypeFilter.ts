import { FilterState, BubbleTypeFilterKey } from "../../types";

export const applyBubbleTypeFilter = (
  filterState: FilterState,
  filterKey: BubbleTypeFilterKey,
  value: string
) => {
  if (!filterState?.bubbleTypeFilters[filterKey].filterOn) {
    return true;
  }
  return filterState.bubbleTypeFilters[filterKey].values.includes(value);
};
