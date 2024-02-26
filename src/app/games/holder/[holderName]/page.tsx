import { listInventory } from "@/database/listInventory";
import { GamesList } from "../../../../components/games-list/GamesList";

type Props = {
    params: {
      holderName: string;
    };
  };

export default async function ListGames(props:Props) {
  const holderName = decodeURI(props.params.holderName)
    const inventoryData = await listInventory(holderName);
    const title = `${holderName}'s Games`
    return (<>
      <h1 className="text-4xl">{title}</h1>
      <GamesList inventoryData={inventoryData} controlsKeys={["tags","playercount","duration"]}></GamesList>
    </>)
}