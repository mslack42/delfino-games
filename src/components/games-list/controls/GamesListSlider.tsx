import { CustomRangeSlider } from "../../input/CustomRangeSlider";
import { FilterState } from "../types";

export type SliderProps = {
  filterState: FilterState;
  setFilterState: (newState: FilterState) => void;
  range: [number, number];
};
export type GamesListSliderProps = SliderProps & {
  filterName: string;
  filterKey: string;
  summariser: (range: [number, number]) => string;
  step: number
};
export function GamesListSlider(props: GamesListSliderProps) {
  const {
    filterState,
    setFilterState,
    range,
    filterName,
    filterKey,
    summariser,
    step
  } = props;

  return (
    <div className="flex justify-center space-x-2">
      <label>
        <b>{filterName}</b>
      </label>
      <input
        type="checkbox"
        checked={filterState.sliderTypeFilters[filterKey].filterOn}
        onChange={() => {
          setFilterState({
            ...filterState,
            sliderTypeFilters: {
              ...filterState.sliderTypeFilters,
              [filterKey]: {
                ...filterState.sliderTypeFilters[filterKey],
                filterOn: !filterState.sliderTypeFilters[filterKey].filterOn,
              },
            },
          });
        }}
      />
      {filterState.sliderTypeFilters[filterKey]?.filterOn ? (
        <CustomRangeSlider
          fullRange={range}
          defaultRange={[
            filterState.sliderTypeFilters[filterKey].lower,
            filterState.sliderTypeFilters[filterKey].upper,
          ]}
          step={step}
          summariser={summariser}
          onChange={(range: number[]) => {
            setFilterState({
              ...filterState,
              sliderTypeFilters: {
                ...filterState.sliderTypeFilters,
                [filterKey]: {
                  ...filterState.sliderTypeFilters[filterKey],
                  upper: Math.max(...range),
                  lower: Math.min(...range),
                },
              },
            });
          }}
        ></CustomRangeSlider>
      ) : undefined}
    </div>
  );
}
