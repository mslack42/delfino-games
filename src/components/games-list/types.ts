export type ControlsKey =
  | BubbleTypeFilterKey
  | SliderTypeFilterKey
  | TextTypeFilterKey
  | BooleanTypeFilterKey;
export type BubbleTypeFilterKey = "office" | "holders" | "tags";
export type SliderTypeFilterKey = "playercount" | "duration";
export type TextTypeFilterKey = "name";
export type BooleanTypeFilterKey = "inrotation";

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
