"use client";
import { InventoryItem } from "@/database/types";
import { useState } from "react";
import { GamesListFilterControls } from "./GamesListFilterControls";
import { InventoryItemPanel } from "../data-display/InventoryItemPanel";
import { ControlsKey } from "./types";
import { GamesListSortControls } from "./GamesListSortControls";

type Props = {
  inventoryData: InventoryItem[];
  controlsKeys: ControlsKey[];
};

const defaultSort = (gamelist: InventoryItem[]) => {
  if (!gamelist) {
    return gamelist;
  }
  const sorted = [...gamelist];
  sorted.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
};

export function GamesList(props: Props) {
  const [filteredGamesList, setFilteredGamesList] = useState(
    props.inventoryData
  );
  const [sortingMethod, setSortingMethod] =
    useState<(list: InventoryItem[]) => InventoryItem[]>(defaultSort);

  const applyFilters = (filteredList: InventoryItem[]) => {
    setFilteredGamesList(filteredList);
  };

  const applySorting = (
    sortedMethod: (list: InventoryItem[]) => InventoryItem[]
  ) => {
    setSortingMethod(() => sortedMethod);
  };

  let sorted = [...filteredGamesList];
  if (sortingMethod) {
    sorted = sortingMethod(sorted);
  }

  return (
    <div className="h-full w-full">
      <div className="w-full flex flex-row justify-center text-center items-center flex-wrap">
        <div className="w-4/5 w-max-4/5">
          <GamesListFilterControls
            gamesList={props.inventoryData}
            onFilterChange={applyFilters}
            controlsKeys={props.controlsKeys}
          />
        </div>
        <div className="w-4/5 w-max-4/5">
          <GamesListSortControls
            gamesList={filteredGamesList}
            onSortChange={applySorting}
          />
        </div>
      </div>
      <div className="flex max-w-full flex-wrap justify-around px-3">
        {sorted.map((id) => (
          <InventoryItemPanel key={id.id} data={id}></InventoryItemPanel>
        ))}
      </div>
    </div>
  );
}
