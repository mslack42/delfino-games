import { InventoryItem } from "@/database/types";
import { twJoin } from "tailwind-merge";
import { GameCardImage } from "./display/GameCardImage";
import { GameCardData } from "./data/GameCardData";
import { GameTitle } from "./display/GameTitle";
import { GameCardActions } from "./actions/GameCardActions";

export type PanelProps = {
  data: InventoryItem;
};
export type GameDataFields =
  | "PlayerCount"
  | "Duration"
  | "Office"
  | "Holder"
  | "Owner";
export type GameActions = "Edit" | "ToggleRotation" | "ToggleRequest";
export function InventoryItemPanel(props: PanelProps) {
  const { data } = props;

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
          data.dsData.inRotation ? "" : "grayscale"
        )}
      >
        <GameCardData data={data} />
      </div>
      <div className="absolute h-40 w-40 md:h-60 md:w-60 text-white filter-none">
        <GameCardActions data={data} />
      </div>
      <div
        className={twJoin(
          "absolute h-15 w-40 md:w-60 md:h-20 text-white",
          data.dsData.inRotation ? "" : "grayscale"
        )}
      >
        <GameTitle id={data.id} name={data.name} />
      </div>
    </div>
  );
}
