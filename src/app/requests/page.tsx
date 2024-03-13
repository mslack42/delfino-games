import { GamesList } from "@/components/games-list/GamesList";
import {
  GameActions,
  GameDataFields,
} from "@/components/games-list/card/InventoryItemPanel";
import { ControlsKey } from "@/components/games-list/filter/types";
import { getGamesRequests } from "@/database/game-requests/getGamesRequests";
import { listInventoryWithOpenRequests } from "@/database/games/listInventory";
import { isLoggedIn } from "@/util/auth/server/isLoggedIn";
import { isRole } from "@/util/auth/server/isRole";

export default async function ListGameRequests() {
  const requestedGames = await listInventoryWithOpenRequests();
  const loggedIn = await isLoggedIn();
  const controlKeys: ControlsKey[] = ["office"];
  const details: GameDataFields[] = ["Requesters"];
  const actions: GameActions[] = (await isRole("Admin", "Holder"))
    ? ["ToggleRequest", "ToggleRotation", "ClearAllRequests"]
    : loggedIn
      ? ["ToggleRequest"]
      : [];

  const gameRequests = await getGamesRequests();

  return (
    <div>
      <h1 className="text-4xl py-2">Open Game Requests</h1>
      <GamesList
        inventoryData={requestedGames}
        controlsKeys={controlKeys}
        details={details}
        actions={actions}
        gameRequestData={gameRequests}
      ></GamesList>
    </div>
  );
}
