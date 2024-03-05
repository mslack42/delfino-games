import { FilterState } from "../../types";

export type BooleanFilterProps = {
  filterName: string;
  filterKey: string;
  filterState: FilterState;
  setFilterState: (newState: FilterState) => void;
};

export function BooleanFilter(props: BooleanFilterProps) {
  const { filterName, filterKey, filterState, setFilterState } = props;

  return (
    <div className="flex justify-center space-x-2">
      <label>
        <b>{filterName}</b>
      </label>
      <input
        type="checkbox"
        checked={filterState.booleanTypeFilters[filterKey].filterOn}
        onChange={() => {
          setFilterState({
            ...filterState,
            booleanTypeFilters: {
              ...filterState.booleanTypeFilters,
              [filterKey]: {
                ...filterState.booleanTypeFilters[filterKey],
                filterOn: !filterState.booleanTypeFilters[filterKey].filterOn,
              },
            },
          });
        }}
      />
    </div>
  );
}
