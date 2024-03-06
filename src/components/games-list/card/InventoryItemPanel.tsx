import { ApiRoutes, ApplicationRoutes } from "@/constants/routes";
import { InventoryItem } from "@/database/types";
import { playerCount, playTime } from "@/util/text-formatting";
import {
  faHandPointUp,
  faHourglass,
  faPenToSquare,
  faSquareCheck,
  faSquareXmark,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faUser as faEmptyUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { MouseEventHandler, useContext } from "react";
import { GamesListContext } from "../GamesListContext";

type PanelProps = {
  data: InventoryItem;
  displaying: GameDataFields[];
  actions: GameActions[];
};
export type GameDataFields =
  | "PlayerCount"
  | "Duration"
  | "Office"
  | "Holder"
  | "Owner";
export type GameActions = "Edit" | "ToggleRotation" | "ToggleRequest";
export function InventoryItemPanel(props: PanelProps) {
  const { data, displaying, actions } = props;
  const { inventoryData, setInventoryData } = useContext(GamesListContext);

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

  async function changeRotationStatus() {
    try {
      const gameId = data.id;
      const newStatus = !data.dsData.inRotation;

      const res = await fetch(ApiRoutes.ChangeRotationStatus, {
        method: "POST",
        body: JSON.stringify({
          id: gameId,
          newStatus: newStatus,
        }),
      });
      if (!res.ok) {
        // TODO some error handling
      }
      setInventoryData(
        inventoryData.map((v) => {
          if (v.id !== gameId) {
            return v;
          }
          return {
            ...v,
            dsData: {
              ...v.dsData,
              inRotation: newStatus,
            },
          };
        })
      );
    } catch (error: any) {
      //
    }
  }

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
      <div className="absolute h-40 w-40 text-white text-sm">
        <div className="absolute bottom-0 right-0 rounded-lg p-2 ">
          <ul className="flex flex-col space-y-1">
            {actions.includes("ToggleRotation") && (
              <li>
                <GameCardActionButton
                  body={
                    data.dsData.inRotation ? (
                      <FontAwesomeIcon icon={faSquareCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faSquareXmark} />
                    )
                  }
                  onClick={changeRotationStatus}
                />
              </li>
            )}
            {actions.includes("Edit") && (
              <li>
                <GameCardActionButton
                  body={<FontAwesomeIcon icon={faPenToSquare} />}
                />
              </li>
            )}
            {actions.includes("ToggleRequest") && (
              <li>
                <GameCardActionButton
                  body={<FontAwesomeIcon icon={faHandPointUp} />}
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
type GameCardActionProps = {
  body: React.ReactNode | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
function GameCardActionButton(props: GameCardActionProps) {
  return (
    <div className="bg-cyan-500 p-1 rounded-lg text-xs">
      <button onClick={props.onClick}>{props.body}</button>
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
