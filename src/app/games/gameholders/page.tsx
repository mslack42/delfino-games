import { listHolders } from "@/database/holders/listHolders";
import { Location } from "@prisma/client";
import { GameHolderList } from "./GameHolderList";

export default async function GameCollectionsByHolder() {
  const holders = (await listHolders())
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((h) => h.heldGames.length > 0)
    .map((h) => {
      return {
        name: h.name,
        location: h.location,
      };
    });

  const activeOffices: Location[] = [
    ...new Set(holders.map((h) => h.location)),
  ];

  return (
    <div>
      <div className="flex flex-row flex-wrap justify-center text-center py-4">
        <h1 className="text-4xl w-full">Games Holders</h1>
        <p className="w-full">
          See the games owned by specific games holders by following the links
          below.
        </p>
      </div>
      <GameHolderList offices={activeOffices} holders={holders} />
    </div>
  );
}
