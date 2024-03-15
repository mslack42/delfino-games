export type ControlsKey =
  | BubbleTypeFilterKey
  | SliderTypeFilterKey
  | TextTypeFilterKey
  | BooleanTypeFilterKey;
export const BubbleTypeFilterKeys = ["office", "holders", "tags"] as const;
export type BubbleTypeFilterKey = (typeof BubbleTypeFilterKeys)[number];
export const SliderTypeFilterKeys = ["playercount", "duration"] as const;
export type SliderTypeFilterKey = (typeof SliderTypeFilterKeys)[number];
export const TextTypeFilterKeys = ["name"] as const;
export type TextTypeFilterKey = (typeof TextTypeFilterKeys)[number];
export const BooleanTypeFilterKeys = ["inrotation", "requested"] as const;
export type BooleanTypeFilterKey = (typeof BooleanTypeFilterKeys)[number];

export type BubbleTypeFilter = {
  filterOn: boolean;
  values: string[];
};

export type SliderTypeFilter = {
  filterOn: boolean;
  lower: number;
  upper: number;
};

export type TextTypeFilter = {
  filterOn: boolean;
  text: string;
};

export type BooleanTypeFilter = {
  filterOn: boolean;
};

export type FilterType =
  | "bubbleTypeFilters"
  | "sliderTypeFilters"
  | "textTypeFilters"
  | "booleanTypeFilters";
export type FilterState = {
  bubbleTypeFilters: {
    [key in BubbleTypeFilterKey as string]: BubbleTypeFilter;
  };
  sliderTypeFilters: {
    [key in SliderTypeFilterKey as string]: SliderTypeFilter;
  };
  textTypeFilters: {
    [key in TextTypeFilterKey as string]: TextTypeFilter;
  };
  booleanTypeFilters: {
    [key in BooleanTypeFilterKey as string]: BooleanTypeFilter;
  };
};
