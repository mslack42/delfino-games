import { CustomRangeSlider } from "../input/CustomRangeSlider";
import { FilterState } from "./types";

export type SliderProps = {
  filterState: FilterState;
  setFilterState: (newState: FilterState) => void;
  range: [number, number];
};
export function PlayerCountSlider(props: SliderProps) {
  const filterName = "Player Count";
  const filterKey = "playercount";

  const { filterState, setFilterState, range } = props;

  const summariser = (range: [number, number]) => {
    const lower = Math.min(...range);
    const upper = Math.max(...range);

    const upperString = upper == 12 ? "12+" : `${upper}`;

    if (lower < upper) {
      return `${lower} - ${upperString}`;
    } else {
      return upperString;
    }
  };

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