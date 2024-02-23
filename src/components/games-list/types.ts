export type ControlsKey = BubbleTypeFilterKey;
export type BubbleTypeFilterKey = "office" | "holders" | "tags";

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