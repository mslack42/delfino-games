import { listInventory } from "@/database/games/listInventory";
import { GamesList } from "../../../../components/games-list/GamesList";
import {
  GameDataFields,
  GameActions,
} from "@/components/data-display/InventoryItemPanel";
import { ControlsKey } from "@/components/games-list/filter/types";
import { isNotRole } from "@/util/auth/server/isNotRole";
import { isRole } from "@/util/auth/server/isRole";

type Props = {
  params: {
    holderName: string;
  };
};

export default async function ListGames(props: Props) {
  const holderName = decodeURI(props.params.holderName);
  const inventoryData = await listInventory(holderName);
  const title = `${holderName}'s Games`;

  const controlKeys: ControlsKey[] = [
    "holders",
    "office",
    "tags",
    "playercount",
    "duration",
    "name",
    "inrotation",
  ];
  const details: GameDataFields[] = ["PlayerCount", "Duration"];
  const actions: GameActions[] = (await isRole("Admin", "Holder"))
    ? ["Edit", "ToggleRequest", "ToggleRotation"]
    : ["ToggleRequest"];

  return (
    <>
      <h1 className="text-4xl py-2">{title}</h1>
      <GamesList
        inventoryData={inventoryData}
        controlsKeys={controlKeys}
        details={details}
        actions={actions}
      ></GamesList>
    </>
  );
}
