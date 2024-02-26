import { CustomRangeSlider } from "../input/CustomRangeSlider";
import { FilterState } from "./types";

export type SliderProps = {
  filterName: string;
  filterState: FilterState;
  setFilterState: (newState: FilterState) => void;
  filterKey: string;
  range: [number, number];
};
export function PlayerCountSlider(props: SliderProps) {
  const { filterName, filterState, setFilterState, filterKey, range } = props;

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
            filterState.sliderTypeFilters[filterKey].upper
          ]}
          summariser={summariser}
          onChange={(range:number[]) => {
            setFilterState({
                ...filterState,
                sliderTypeFilters: {
                  ...filterState.sliderTypeFilters,
                  [filterKey]: {
                    ...filterState.sliderTypeFilters[filterKey],
                   upper: Math.max(...range),
                   lower: Math.min(...range)
                  },
                },
            })
          }}
        ></CustomRangeSlider>
      ) : undefined}
    </div>
  );
}
