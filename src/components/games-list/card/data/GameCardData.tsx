import { playerCount, playTime } from "@/util/text-formatting";
import {
  faHourglass,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faUser as faEmptyUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { GamesListContext } from "../../GamesListContext";
import { GameCardDataRow } from "./GameCardDataRow";
import { PanelProps } from "../InventoryItemPanel";

export function GameCardData(props: PanelProps) {
  const { data } = props;
  const { details } = useContext(GamesListContext);
  return (
    <div className="absolute w-40 text-xs bottom-0 left-0  bg-gradient-to-t from-teal-600 via-teal-600 to-transparent pt-8 rounded-lg">
      <div className="absoulte w-2/3 bottom-0 left-0 ">
        <div className="flex justify items-center text-center flex-col pb-1">
          {details.includes("PlayerCount") && (
            <GameCardDataRow
              keyPart={<FontAwesomeIcon icon={faUsers} />}
              valuePart={playerCount(
                data.bggData.specs.maxPlayerCount,
                data.bggData.specs.minPlayerCount
              )}
            />
          )}
          {details.includes("Duration") && (
            <GameCardDataRow
              keyPart={<FontAwesomeIcon icon={faHourglass} />}
              valuePart={playTime(
                data.bggData.specs.maxPlayTime,
                data.bggData.specs.minPlayTime
              )}
            />
          )}
          {details.includes("Office") && (
            <GameCardDataRow
              keyPart={<FontAwesomeIcon icon={faEmptyUser} />}
              valuePart={<div>{data.dsData.location}</div>}
            />
          )}
          {details.includes("Holder") && (
            <GameCardDataRow
              keyPart={<FontAwesomeIcon icon={faUser} />}
              valuePart={<div>{data.dsData.holder}</div>}
            />
          )}
        </div>
      </div>
    </div>
  );
}