import { listInventory } from "@/database/games/listInventory";
import { GamesList } from "../../components/games-list/GamesList";

export default async function ListGames() {
  const inventoryData = await listInventory();

  return (
    <>
      <h1 className="text-4xl py-2">All Games</h1>
      <GamesList
        inventoryData={inventoryData}
        controlsKeys={[
          "holders",
          "office",
          "tags",
          "playercount",
          "duration",
          "name",
          "inrotation",
        ]}
      ></GamesList>
    </>
  );
}
