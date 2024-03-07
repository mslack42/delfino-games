import { listInventory } from "@/database/games/listInventory";
import { GamesList } from "../../../../components/games-list/GamesList";
import {
  GameDataFields,
  GameActions,
} from "@/components/games-list/card/InventoryItemPanel";
import { ControlsKey } from "@/components/games-list/filter/types";
import { isRole } from "@/util/auth/server/isRole";
import { isLoggedIn } from "@/util/auth/server/isLoggedIn";

type Props = {
  params: {
    holderName: string;
  };
};

export default async function ListGames(props: Props) {
  const holderName = decodeURI(props.params.holderName);
  const inventoryData = await listInventory(holderName);
  const title = `${holderName}'s Games`;

  const loggedIn = await isLoggedIn();

  const controlKeys: ControlsKey[] = [
    "tags",
    "playercount",
    "duration",
    "name",
    "inrotation",
  ];
  const details: GameDataFields[] = ["PlayerCount", "Duration"];
  const actions: GameActions[] = (await isRole("Admin", "Holder"))
    ? ["Edit", "ToggleRequest", "ToggleRotation"]
    : loggedIn
      ? ["ToggleRequest"]
      : [];

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
