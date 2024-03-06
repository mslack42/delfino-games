"use client";
import { InventoryItem } from "@/database/types";
import { useState } from "react";
import { GamesListFilterControls } from "./filter/GamesListFilterControls";
import {
  GameActions,
  GameDataFields,
} from "../data-display/InventoryItemPanel";
import { InventoryItemPanel } from "../data-display/InventoryItemPanel";
import { ControlsKey } from "./types";
import { GamesListSortControls } from "./sort/GamesListSortControls";

type Props = {
  inventoryData: InventoryItem[];
  controlsKeys: ControlsKey[];
  details: GameDataFields[];
  actions: GameActions[];
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
      <div className="w-full flex flex-row justify-center text-center items-center flex-wrap space-x-10">
        <div>
          <GamesListFilterControls
            gamesList={props.inventoryData}
            onFilterChange={applyFilters}
            controlsKeys={props.controlsKeys}
          />
        </div>
        <div>
          <GamesListSortControls
            gamesList={filteredGamesList}
            onSortChange={applySorting}
            defaultSort="name"
          />
        </div>
      </div>
      <div className="flex max-w-screen-xl flex-row flex-wrap justify-center">
        <div className="grid columns-auto w-full row-auto grid-cols-game-cards gap-4 ">
          {sorted.length ? (
            sorted.map((id) => (
              <span key={id.id} className="flex justify-center">
                <InventoryItemPanel
                  key={id.id}
                  data={id}
                  displaying={props.details}
                  actions={props.actions}
                ></InventoryItemPanel>
              </span>
            ))
          ) : (
            <div className="text-lg h-60 flex  flex-col justify-center align-middle">
              <p>Nothing to see here 😢</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
