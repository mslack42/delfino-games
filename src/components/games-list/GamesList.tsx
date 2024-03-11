"use client";
import { InventoryItem } from "@/database/types";
import { useCallback, useEffect, useState } from "react";
import { GamesListFilterControls } from "./filter/GamesListFilterControls";
import { GameActions, GameDataFields } from "./card/InventoryItemPanel";
import { InventoryItemPanel } from "./card/InventoryItemPanel";
import { ControlsKey } from "./filter/types";
import { GamesListSortControls } from "./sort/GamesListSortControls";
import {
  GamesListContext,
  GamesListContextType,
  defaultFilter,
  defaultGamesListContext,
  defaultSort,
} from "./GamesListContext";

type Props = {
  inventoryData: InventoryItem[];
  controlsKeys: ControlsKey[];
  details: GameDataFields[];
  actions: GameActions[];
};

export function GamesList(props: Props) {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>(
    props.inventoryData
  );
  const [sortingMethod, setSortingMethod] = useState<
    (list: InventoryItem[]) => InventoryItem[]
  >(() => defaultSort);
  const [filterMethod, setFilterMethod] = useState<
    (list: InventoryItem[]) => InventoryItem[]
  >(() => defaultFilter);

  const gamesListContext: GamesListContextType = {
    ...defaultGamesListContext,
    actions: props.actions,
    controlsKeys: props.controlsKeys,
    details: props.details,
    inventoryData,
    setInventoryData,
    sortingMethod,
    setSortingMethod,
    filterMethod,
    setFilterMethod,
  };

  const appliedSort = useCallback(sortingMethod, [sortingMethod]);
  const appliedFilter = useCallback(filterMethod, [filterMethod]);

  const [displayedInventory, setDisplayedInventory] = useState(inventoryData);
  useEffect(() => {
    let newDisplay: InventoryItem[] = inventoryData;
    if (appliedFilter) {
      newDisplay = appliedFilter(newDisplay);
    }
    if (appliedSort) {
      newDisplay = appliedSort(newDisplay);
    }
    setDisplayedInventory(newDisplay);
  }, [appliedFilter, appliedSort, inventoryData]);

  return (
    <GamesListContext.Provider value={gamesListContext}>
      <div className="h-full w-full">
        <div className="w-full flex flex-row justify-center text-center items-center flex-wrap space-x-10">
          <div>
            <GamesListFilterControls />
          </div>
          <div>
            <GamesListSortControls defaultSort="name" />
          </div>
        </div>
        <div className="flex max-w-full flex-row flex-wrap justify-center">
          {displayedInventory.length ? (
            <div className="grid columns-auto w-full row-auto grid-cols-game-cards-sm md:grid-cols-game-cards-md gap-4 ">
              {displayedInventory.map((id) => (
                <span key={id.id} className="flex justify-center">
                  <InventoryItemPanel
                    key={id.id}
                    data={id}
                  ></InventoryItemPanel>
                </span>
              ))}
            </div>
          ) : (
            <div className="text-lg h-60 flex  flex-col justify-center align-middle">
              <p>Nothing to see here 😢</p>
            </div>
          )}
        </div>
      </div>
    </GamesListContext.Provider>
  );
}
