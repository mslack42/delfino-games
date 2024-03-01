import { listInventory } from "@/database/games/listInventory";
import { GamesList } from "../../../../components/games-list/GamesList";

type Props = {
  params: {
    holderName: string;
  };
};

export default async function ListGames(props: Props) {
  const holderName = decodeURI(props.params.holderName);
  const inventoryData = await listInventory(holderName);
  const title = `${holderName}'s Games`;
  return (
    <>
      <h1 className="text-4xl py-2">{title}</h1>
      <GamesList
        inventoryData={inventoryData}
        controlsKeys={["tags", "playercount", "duration", "name"]}
      ></GamesList>
    </>
  );
}
