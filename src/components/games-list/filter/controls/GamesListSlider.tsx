import { useContext } from "react";
import { CustomRangeSlider } from "../../../input/CustomRangeSlider";
import { GamesFilterContext } from "../GamesFilterContext";

export type SliderProps = {
  range: [number, number];
};
export type GamesListSliderProps = SliderProps & {
  filterName: string;
  filterKey: string;
  summariser: (range: [number, number]) => string;
  step: number;
};
export function GamesListSlider(props: GamesListSliderProps) {
  const { range, filterName, filterKey, summariser, step } = props;
  const { filterState, setFilterState } = useContext(GamesFilterContext);

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
