"use client";
import { InventoryItem } from "@/database/types";
import { useState } from "react";
import { GamesListFilterControls } from "./GamesListFilterControls";
import { InventoryItemPanel } from "../data-display/InventoryItemPanel";
import { ControlsKey } from "./types";

type Props = {
  inventoryData: InventoryItem[];
  controlsKeys: ControlsKey[]
};

export function GamesList(props: Props) {
  const [filteredGamesList, setFilteredGamesList] = useState(
    props.inventoryData
  );

  const applyFilters = (filteredList: InventoryItem[]) => {
    setFilteredGamesList(filteredList);
  };

  return (
    <div className="h-full w-full">
      <div className="w-full flex flex-row justify-center text-center items-center">
        <div className="w-4/5 w-max-4/5">
          <GamesListFilterControls
            gamesList={props.inventoryData}
            onFilterChange={applyFilters}
            controlsKeys={props.controlsKeys}
          />
        </div>
      </div>
      <div className="flex max=w=full flex-wrap justify-around px-3">
        {filteredGamesList.map((id) => (
          <InventoryItemPanel key={id.id} data={id}></InventoryItemPanel>
        ))}
      </div>
    </div>
  );
}
