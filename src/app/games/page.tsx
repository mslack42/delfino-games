import { listInventory } from "@/database/games/listInventory";
import { GamesList } from "../../components/games-list/GamesList";
import { RoleCheck } from "@/components/auth/serverside/RoleCheck";

export default async function ListGames() {
  const inventoryData = await listInventory();

  return (
    <>
      <h1 className="text-4xl py-2">All Games</h1>
      <RoleCheck
        type={"noneOf"}
        content={
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
            details={["PlayerCount", "Duration", "Holder"]}
          ></GamesList>
        }
        elseContent={
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
            details={["PlayerCount", "Duration"]}
          ></GamesList>
        }
        roles={["Unverified"]}
      ></RoleCheck>
    </>
  );
}
