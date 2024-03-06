import { useContext } from "react";
import { GamesFilterContext } from "../GamesFilterContext";

export type BooleanFilterProps = {
  filterName: string;
  filterKey: string;
};

export function BooleanFilter(props: BooleanFilterProps) {
  const { filterName, filterKey } = props;
  const { filterState, setFilterState } = useContext(GamesFilterContext);

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
