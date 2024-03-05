import { DataSummaryKeyValuePair } from "@/components/data-display/DataSummaryKeyValuePair";
import { ApplicationRoutes } from "@/constants/routes";
import { InventoryItem } from "@/database/types";
import { playerCount, playTime } from "@/util/text-formatting";
import {
  faHourglass,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faUser as faEmptyUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div className="h-40 w-40 relative overflow-hidden flex justify-center align-middle">
      <div className="h-40 w-40 relative flex flex-col justify-center align-middle overflow-hidden">
        <Image
          fill={true}
          style={{ objectFit: "cover" }}
          sizes="160px"
          src={data.bggData.thumb!}
          alt={data.name}
          className="w-40 h-40 rounded-lg"
        ></Image>
      </div>
    </div>
  ) : (
    <div className="text-lg h-40 w-40 text-center bg-slate-400 text-gray-300 align-middle">
      <span>No image found</span>
    </div>
  );

  return (
    <div
      className={twJoin(
        "rounded-xl h-40 w-40 overflow-hidden mx-2 my-2",
        data.dsData.inRotation ? "" : "grayscale"
      )}
    >
      <div>
        <div className="flex justify-center h-full absolute">
          {displayImage}
        </div>
      </div>
      <div className="absolute h-40 w-40 text-white">
        <div className="absolute w-40 text-xs bottom-0 left-0  bg-gradient-to-t from-teal-600 via-teal-600 to-transparent pt-8 rounded-lg">
          <div className="absoulte w-2/3 bottom-0 left-0 ">
            <div className="flex justify items-center text-center flex-col pb-1">
              {displaying.includes("PlayerCount") && (
                <DataRow
                  keyPart={<FontAwesomeIcon icon={faUsers} />}
                  valuePart={playerCount(
                    data.bggData.specs.maxPlayerCount,
                    data.bggData.specs.minPlayerCount
                  )}
                />
              )}
              {displaying.includes("Duration") && (
                <DataRow
                  keyPart={<FontAwesomeIcon icon={faHourglass} />}
                  valuePart={playTime(
                    data.bggData.specs.maxPlayTime,
                    data.bggData.specs.minPlayTime
                  )}
                />
              )}
              {displaying.includes("Office") && (
                <DataRow
                  keyPart={<FontAwesomeIcon icon={faEmptyUser} />}
                  valuePart={<div>{data.dsData.location}</div>}
                />
              )}
              {displaying.includes("Holder") && (
                <DataRow
                  keyPart={<FontAwesomeIcon icon={faUser} />}
                  valuePart={<div>{data.dsData.holder}</div>}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-40 w-40 text-white">
        <Link href={ApplicationRoutes.Game(data.id)}>
          <div className="bg-gradient-to-b from-teal-600 via-teal-600 to-transparent py-1 rounded-lg">
            <h1
              className="text-center text-sm font-bold line-clamp-1  "
              title={data.name}
            >
              {data.name}
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

type DataRowProps = {
  keyPart: React.ReactNode | string;
  valuePart: React.ReactNode | string;
};
function DataRow(props: DataRowProps) {
  return (
    <div className="flex flex-row text-left justify-start flex-wrap space-x-2 w-full pl-2">
      <div>{props.keyPart}</div>
      <div>{props.valuePart}</div>
    </div>
  );
}
