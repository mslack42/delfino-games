import { InventoryItem } from "@/database/types";
import { twJoin } from "tailwind-merge";
import { GameCardImage } from "./display/GameCardImage";
import { GameCardData } from "./data/GameCardData";
import { GameTitle } from "./display/GameTitle";
import { GameCardActions } from "./actions/GameCardActions";
import { GamesListContext } from "../GamesListContext";
import { useContext } from "react";
import { useLoggedInInspection } from "@/util/auth/client/useLoggedInInspection";

export type PanelProps = {
  data: InventoryItem;
};
export type GameDataFields =
  | "PlayerCount"
  | "Duration"
  | "Office"
  | "Holder"
  | "Owner"
  | "Requesters";
export type GameActions =
  | "Edit"
  | "ToggleRotation"
  | "ToggleRequest"
  | "ClearAllRequests";
export function InventoryItemPanel(props: PanelProps) {
  const { data } = props;
  const { details } = useContext(GamesListContext);
  const { isLoggedIn } = useLoggedInInspection();

  return (
    <div className="rounded-xl h-40 w-40 md:h-60 md:w-60 overflow-hidden mx-2 my-2">
      <div>
        <div
          className={twJoin(
            "flex justify-center h-full absolute ",
            data.dsData.inRotation ? "" : "grayscale"
          )}
        >
          <GameCardImage src={data.bggData.thumb} alt={data.name} />
        </div>
      </div>
      <div
        className={twJoin(
          "absolute h-40 w-40 md:h-60 md:w-60 text-white",
          data.dsData.inRotation ||
            (details.includes("Requesters") && isLoggedIn())
            ? ""
            : "grayscale"
        )}
      >
        <GameCardData data={data} />
      </div>
      <div className="absolute h-40 w-40 md:h-60 md:w-60 text-white filter-none pointer-events-none">
        <GameCardActions data={data} />
      </div>
      <div
        className={twJoin(
          "absolute h-10 w-40 md:w-60 md:h-15 text-white",
          data.dsData.inRotation ? "" : "grayscale"
        )}
      >
        <GameTitle id={data.id} name={data.name} />
      </div>
    </div>
  );
}
