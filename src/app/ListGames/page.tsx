import { listInventory } from "@/database/listInventory";
import { GamesList } from "./GamesList";

export default async function ListGames() {
    const inventoryData = await listInventory()

    return <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>List of games</h1>
        <GamesList inventoryData={inventoryData}></GamesList>
    </main>
}