import { playerCount, playTime } from "@/util/text-formatting";
import {
  faHourglass,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { GamesListContext } from "../../GamesListContext";
import { GameCardDataRow } from "./GameCardDataRow";
import { PanelProps } from "../InventoryItemPanel";
import { GameCardRequesterList } from "./GameCardRequesterList";
import { Conditional } from "@/components/common/Conditional";
import { twJoin } from "tailwind-merge";

export function GameCardData(props: PanelProps) {
  const { data } = props;
  const { details } = useContext(GamesListContext);
  const isInRotation = data.dsData.inRotation;

  return (
    <div
      className={twJoin(
        "absolute w-40 text-xs bottom-0 left-0 pt-8 rounded-lg",
        "md:w-60 md:text-sm",
        "bg-gradient-to-t from-teal-600 via-teal-600 to-transparent",
        isInRotation ? "" : "grayscale"
      )}
    >
      <div className="absoulte w-32 md:w-52 bottom-0 left-0 ">
        <div className="flex justify items-center text-center flex-col pb-1">
          <Conditional when={details.includes("PlayerCount")}>
            <GameCardDataRow
              keyPart={<FontAwesomeIcon icon={faUsers} />}
              valuePart={playerCount(
                data.bggData.specs.maxPlayerCount,
                data.bggData.specs.minPlayerCount
              )}
            />
          </Conditional>
          <Conditional when={details.includes("Duration")}>
            <GameCardDataRow
              keyPart={<FontAwesomeIcon icon={faHourglass} />}
              valuePart={playTime(
                data.bggData.specs.maxPlayTime,
                data.bggData.specs.minPlayTime
              )}
            />
          </Conditional>
          <Conditional when={details.includes("Office")}>
            <GameCardDataRow
              keyPart={<FontAwesomeIcon icon={faMap} />}
              valuePart={<div>{data.dsData.location}</div>}
            />
          </Conditional>
          <Conditional when={details.includes("Holder")}>
            <GameCardDataRow
              keyPart={<FontAwesomeIcon icon={faUser} />}
              valuePart={<div>{data.dsData.holder}</div>}
            />
          </Conditional>
          <Conditional when={details.includes("Requesters")}>
            <GameCardRequesterList {...props} />
          </Conditional>
        </div>
      </div>
    </div>
  );
}
