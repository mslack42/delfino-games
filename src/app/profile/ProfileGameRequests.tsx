import { GamesList } from "@/components/games-list/GamesList";
import {
  GameActions,
  GameDataFields,
} from "@/components/games-list/card/InventoryItemPanel";
import { getUserGameRequests } from "@/database/game-requests/getUserGameRequests";
import { getUserData } from "@/util/auth/server/getUserData";
import { ControlsKey } from "@/components/games-list/filter/types";
import { isRole } from "@/util/auth/server/isRole";
import { isLoggedIn } from "@/util/auth/server/isLoggedIn";
import { listInventoryWithOpenRequests } from "@/database/games/listInventory";

export async function ProfileGameRequests() {
  const user = await getUserData();
  const loggedIn = await isLoggedIn();
  const gameRequests = await getUserGameRequests(user.id);

  const controlKeys: ControlsKey[] = [];

  const details: GameDataFields[] = ["PlayerCount", "Duration", "Holder"];

  const actions: GameActions[] = (await isRole("Admin", "Holder"))
    ? ["Edit", "ToggleRequest", "ToggleRotation"]
    : loggedIn
      ? ["ToggleRequest"]
      : [];

  const requestedGames = await listInventoryWithOpenRequests();
  const userRequestedGameIds = gameRequests.map((gr) => gr.game.id);
  const thisUsersRequestedGames = requestedGames.filter((rg) =>
    userRequestedGameIds.includes(rg.id)
  );

  return (
    <div className="w-full">
      <h2 className="w-full text-4xl">Your Game Requests</h2>
      <GamesList
        inventoryData={thisUsersRequestedGames}
        controlsKeys={controlKeys}
        details={details}
        actions={actions}
        gameRequestData={gameRequests}
        noSorting
        cacheKey={`profile${loggedIn ? "loggedIn" : "notloggedin"}`}
      ></GamesList>
    </div>
  );
}
