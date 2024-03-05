import { DataSummaryKeyValuePair } from "@/components/data-display/DataSummaryKeyValuePair";
import { ApplicationRoutes } from "@/constants/routes";
import { InventoryItem } from "@/database/types";
import { playerCount, playTime } from "@/util/text-formatting";
import Image from "next/image";
import Link from "next/link";
import { twJoin } from "tailwind-merge";

type PanelProps = {
  data: InventoryItem;
  displaying: GameDataFields[];
};
export type GameDataFields =
  | "PlayerCount"
  | "Duration"
  | "Office"
  | "Holder"
  | "Owner";
export function InventoryItemPanel(props: PanelProps) {
  const { data, displaying } = props;

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
    <div
      className={twJoin(
        "rounded-lg w-60 bg-cyan-200 overflow-hidden p-2 m-1",
        data.dsData.inRotation ? "" : "grayscale"
      )}
    >
      <Link href={ApplicationRoutes.Game(data.id)}>
        <h1 className="text-center font-bold line-clamp-1" title={data.name}>
          {data.name}
        </h1>
        <div className="flex justify-center">{displayImage}</div>
      </Link>
      <div className="flex justify-center items-center text-center flex-col ">
        {displaying.includes("PlayerCount") && (
          <DataSummaryKeyValuePair
            dataKey="Players"
            dataValue={playerCount(
              data.bggData.specs.maxPlayerCount,
              data.bggData.specs.minPlayerCount
            )}
          ></DataSummaryKeyValuePair>
        )}
        {displaying.includes("Duration") && (
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
        )}
        {displaying.includes("Office") && (
          <DataSummaryKeyValuePair
            dataKey="Office"
            dataValue={<div className="text-right">{data.dsData.location}</div>}
          ></DataSummaryKeyValuePair>
        )}
        {displaying.includes("Holder") && (
          <DataSummaryKeyValuePair
            dataKey="Holder"
            dataValue={<div className="text-right">{data.dsData.holder}</div>}
          ></DataSummaryKeyValuePair>
        )}
      </div>
    </div>
  );
}
