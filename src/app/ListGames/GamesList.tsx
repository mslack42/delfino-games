import { KeyValue } from "@/components/common/KeyValue";
import { InventoryItem } from "@/database/types";
import { playerCount, playTime } from "@/util/text-formatting";
import Image from "next/image";

type Props = {
  inventoryData: InventoryItem[];
};

export function GamesList(props: Props) {
  return (
    <div>
      <div>Some sort of filtering controls...</div>
      <div>
        {props.inventoryData.map((id) => (
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
    <div>
      <h1>{data.name}</h1>
      <div className="flex justify-center">{displayImage}</div>
      <KeyValue
        dataKey="Players"
        dataValue={playerCount(
          data.bggData.specs.maxPlayerCount,
          data.bggData.specs.minPlayerCount
        )}
      ></KeyValue>
      <KeyValue
        dataKey="Duration"
        dataValue={playTime(
          data.bggData.specs.maxPlayTime,
          data.bggData.specs.minPlayTime
        )}
      ></KeyValue>
      <div>{data.dsData.location}</div>
      <div>{data.dsData.holder}</div>
    </div>
  );
}
