"use client";
import { useContext, useEffect, useState } from "react";
import { GamesFilterContext } from "./GamesFilterContext";
import { twJoin } from "tailwind-merge";

export function FilterPanelHead() {
  const { appliedFilterCount } = useContext(GamesFilterContext);
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    setFilterCount(appliedFilterCount);
  }, [appliedFilterCount]);

  return (
    <>
      <div className="relative">
        <h2 className="text-xl rounded p-1 border-2 border-black">
          Filters...
        </h2>
        <div
          className={twJoin(
            "absolute -top-1 -right-2  px-1 rounded-full bg-teal-200 text-sm align-baseline text-teal-800 ",
            filterCount === 0 ? "hidden" : ""
          )}
        >
          {filterCount}
        </div>
      </div>
    </>
  );
}
