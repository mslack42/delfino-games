import { listInventory } from "@/database/games/listInventory";
import { GamesList } from "../../components/games-list/GamesList";

import { ControlsKey } from "@/components/games-list/filter/types";

import { isNotRole } from "@/util/auth/server/isNotRole";
import { isRole } from "@/util/auth/server/isRole";
import {
  GameActions,
  GameDataFields,
} from "@/components/games-list/card/InventoryItemPanel";
import { isLoggedIn } from "@/util/auth/server/isLoggedIn";
import { getGamesRequests } from "@/database/game-requests/getGamesRequests";

export default async function ListGames() {
  const inventoryData = await listInventory();

  const loggedIn = await isLoggedIn();

  const controlKeys: ControlsKey[] = loggedIn
    ? [
        "holders",
        "office",
        "tags",
        "playercount",
        "duration",
        "name",
        "inrotation",
        "requested",
      ]
    : ["office", "tags", "playercount", "duration", "name", "inrotation"];

  const details: GameDataFields[] =
    loggedIn && (await isNotRole("Unverified"))
      ? ["PlayerCount", "Duration", "Holder"]
      : ["PlayerCount", "Duration"];
  const actions: GameActions[] = (await isRole("Admin", "Holder"))
    ? ["Edit", "ToggleRequest", "ToggleRotation"]
    : loggedIn
      ? ["ToggleRequest"]
      : [];

  const gameRequests = await getGamesRequests();

  return (
    <>
      <h1 className="text-4xl py-2">All Games</h1>
      <GamesList
        inventoryData={inventoryData}
        controlsKeys={controlKeys}
        details={details}
        actions={actions}
        gameRequestData={gameRequests}
        cacheKey={`allGames${loggedIn ? "loggedIn" : "notloggedin"}`}
      ></GamesList>
    </>
  );
}
