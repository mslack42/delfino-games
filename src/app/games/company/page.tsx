import { listCompanyInventory } from "@/database/games/listInventory";

import {
  GameDataFields,
  GameActions,
} from "@/components/games-list/card/InventoryItemPanel";
import { ControlsKey } from "@/components/games-list/filter/types";
import { isRole } from "@/util/auth/server/isRole";
import { isLoggedIn } from "@/util/auth/server/isLoggedIn";
import { getGamesRequests } from "@/database/game-requests/getGamesRequests";
import { GamesList } from "@/components/games-list/GamesList";

type Props = {
  params: {
    holderName: string;
  };
};

export default async function ListGames(props: Props) {
  const inventoryData = await listCompanyInventory();
  const title = `Company Games`;

  const loggedIn = await isLoggedIn();

  const controlKeys: ControlsKey[] = [
    "tags",
    "playercount",
    "duration",
    "name",
    "inrotation",
    "office",
    "holders",
  ];
  const details: GameDataFields[] = ["Office", "Holder"];
  const actions: GameActions[] = (await isRole("Admin", "Holder"))
    ? ["Edit", "ToggleRequest", "ToggleRotation"]
    : loggedIn
      ? ["ToggleRequest"]
      : [];

  const gameRequests = await getGamesRequests();

  return (
    <>
      <h1 className="text-4xl py-2">{title}</h1>
      <GamesList
        inventoryData={inventoryData}
        controlsKeys={controlKeys}
        details={details}
        actions={actions}
        gameRequestData={gameRequests}
        cacheKey={`company${loggedIn ? "loggedIn" : "notloggedin"}`}
      ></GamesList>
    </>
  );
}
