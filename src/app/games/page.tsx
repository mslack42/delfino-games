import { listInventory } from "@/database/listInventory";
import { GamesList } from "./GamesList";

export default async function ListGames() {
  const inventoryData = await listInventory();

  return (
    <>
      <h1 className="text-4xl">All Games</h1>
      <GamesList inventoryData={inventoryData} controlsKeys={["holders","office","tags"]}></GamesList>
    </>
  );
}
