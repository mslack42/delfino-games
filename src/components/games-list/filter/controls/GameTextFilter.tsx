import { useContext } from "react";
import { GamesFilterContext } from "../GamesFilterContext";

export function GameTextFilter() {
  const filterName = "Filter by search term?";
  const filterKey = "name";

  const { filterState, setFilterState } = useContext(GamesFilterContext);

  return (
    <div className="flex justify-center space-x-2 py-3 max-w-5/6">
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
        className="border w-5/6"
      />
    </div>
  );
}
