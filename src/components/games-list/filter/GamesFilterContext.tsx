import { FilterState } from "./types";
import { createContext } from "react";

type FilterContext = {
  filterState: FilterState;
  setFilterState: (newState: FilterState) => void;
};
const defaultContext: FilterContext = {
  filterState: {
    bubbleTypeFilters: {},
    sliderTypeFilters: {},
    textTypeFilters: {},
    booleanTypeFilters: {
      inrotation: {
        filterOn: true,
      },
    },
  },
  setFilterState: (_: FilterState) => {},
};
export const GamesFilterContext = createContext<FilterContext>(defaultContext);
