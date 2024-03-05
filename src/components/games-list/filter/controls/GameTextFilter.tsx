import { FilterState } from "../../types";

export type GameTextFilterProps = {
  filterState: FilterState;
  setFilterState: (newState: FilterState) => void;
};

export function GameTextFilter(props: GameTextFilterProps) {
  const filterName = "Search";
  const filterKey = "name";

  const { filterState, setFilterState } = props;

  return (
    <div className="flex justify-center space-x-2">
      <label>
        <b>{filterName}</b>
      </label>
      <input
        type="checkbox"
        checked={filterState.textTypeFilters[filterKey].filterOn}
        onChange={() => {
          setFilterState({
            ...filterState,
            textTypeFilters: {
              ...filterState.textTypeFilters,
              [filterKey]: {
                ...filterState.textTypeFilters[filterKey],
                filterOn: !filterState.textTypeFilters[filterKey].filterOn,
              },
            },
          });
        }}
      />
      {filterState.textTypeFilters[filterKey]?.filterOn ? (
        <input
          type="text"
          maxLength={50}
          placeholder="search term"
          defaultValue={filterState.textTypeFilters[filterKey].text}
          onChange={(evt) => {
            setFilterState({
              ...filterState,
              textTypeFilters: {
                ...filterState.textTypeFilters,
                [filterKey]: {
                  ...filterState.textTypeFilters[filterKey],
                  text: evt.currentTarget.value,
                },
              },
            });
          }}
        />
      ) : undefined}
    </div>
  );
}
