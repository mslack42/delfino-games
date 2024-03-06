import { InventoryItem } from "@/database/types";
import { Dispatch, SetStateAction, createContext } from "react";
import {
  GameDataFields,
  GameActions,
} from "../data-display/InventoryItemPanel";
import { ControlsKey } from "./filter/types";

export type GamesListContextType = {
  inventoryData: InventoryItem[];
  setInventoryData: (newData: InventoryItem[]) => void;
  sortingMethod: (gamelist: InventoryItem[]) => InventoryItem[];
  setSortingMethod: Dispatch<
    SetStateAction<(gamelist: InventoryItem[]) => InventoryItem[]>
  >;
  filterMethod: (gamelist: InventoryItem[]) => InventoryItem[];
  setFilterMethod: Dispatch<
    SetStateAction<(gamelist: InventoryItem[]) => InventoryItem[]>
  >;
  controlsKeys: ControlsKey[];
  details: GameDataFields[];
  actions: GameActions[];
};

export const defaultSort = (gamelist: InventoryItem[]) => {
  if (!gamelist) {
    return gamelist;
  }
  const sorted = [...gamelist];
  sorted.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
};
export const defaultFilter = (gamelist: InventoryItem[]) => {
  return gamelist;
};

export const defaultGamesListContext: GamesListContextType = {
  controlsKeys: [],
  details: [],
  actions: [],
  inventoryData: [],
  setInventoryData: (_: InventoryItem[]) => {},
  sortingMethod: defaultSort,
  filterMethod: defaultFilter,
  setSortingMethod: function (
    _: SetStateAction<(gamelist: InventoryItem[]) => InventoryItem[]>
  ): void {},
  setFilterMethod: function (
    _: SetStateAction<(gamelist: InventoryItem[]) => InventoryItem[]>
  ): void {},
};

export const GamesListContext = createContext<GamesListContextType>(
  defaultGamesListContext
);
