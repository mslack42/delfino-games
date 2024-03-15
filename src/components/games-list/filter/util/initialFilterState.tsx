import { FilterState } from "../types";

export const initialFilterState: FilterState = {
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
  sliderTypeFilters: {
    playercount: {
      filterOn: false,
      lower: 1,
      upper: 12,
    },
    duration: {
      filterOn: false,
      lower: 5,
      upper: 120,
    },
  },
  textTypeFilters: {
    name: {
      filterOn: false,
      text: "",
    },
  },
  booleanTypeFilters: {
    inrotation: {
      filterOn: true,
    },
    requested: {
      filterOn: false,
    },
  },
};
