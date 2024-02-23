"use client";
import { DataSummaryKeyValuePair } from "@/components/data-display/DataSummaryKeyValuePair";
import { InventoryItem } from "@/database/types";
import { playerCount, playTime } from "@/util/text-formatting";
import Image from "next/image";
import { useState } from "react";
import { ControlsKey, GamesListFilterControls } from "./GamesListFilterControls";

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

type PanelProps = {
  data: InventoryItem;
};

function InventoryItemPanel(props: PanelProps) {
  const { data } = props;

  const displayImage = data.bggData.thumb ? (
    <Image
      src={data.bggData.thumb!}
      alt={data.name}
      height="160"
      width="160"
      className="w-auto h-36"
    ></Image>
  ) : (
    <div className="text-lg h-36 text-center bg-slate-400 text-gray-300 align-middle">
      <span>No image found</span>
    </div>
  );

  return (
    <div className="rounded-lg bg-cyan-200 w-60 max-h-96 overflow-hidden p-2 m-1">
      <h1 className="text-center font-bold line-clamp-1" title={data.name}>
        {data.name}
      </h1>
      <div className="flex justify-center">{displayImage}</div>
      <div className="flex justify-center items-center text-center flex-col ">
        <DataSummaryKeyValuePair
          dataKey="Players"
          dataValue={playerCount(
            data.bggData.specs.maxPlayerCount,
            data.bggData.specs.minPlayerCount
          )}
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey="Duration"
          dataValue={
            <div className="text-right">
              {playTime(
                data.bggData.specs.maxPlayTime,
                data.bggData.specs.minPlayTime
              )}
            </div>
          }
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey="Office"
          dataValue={<div className="text-right">{data.dsData.location}</div>}
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey="Holder"
          dataValue={<div className="text-right">{data.dsData.holder}</div>}
        ></DataSummaryKeyValuePair>
      </div>
    </div>
  );
}
