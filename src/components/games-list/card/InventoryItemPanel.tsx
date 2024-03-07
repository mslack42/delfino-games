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
    <div
      className={twJoin(
        "rounded-xl h-40 w-40 overflow-hidden mx-2 my-2",
        data.dsData.inRotation ? "" : "grayscale"
      )}
    >
      <div>
        <div className="flex justify-center h-full absolute">
          <GameCardImage src={data.bggData.thumb} alt={data.name} />
        </div>
      </div>
      <div className="absolute h-40 w-40 text-white">
        <GameCardData data={data} />
      </div>
      <div className="absolute h-40 w-40 text-white">
        <GameCardActions data={data} />
      </div>
      <div className="absolute h-15 w-40 text-white">
        <GameTitle id={data.id} name={data.name} />
      </div>
    </div>
  );
}
