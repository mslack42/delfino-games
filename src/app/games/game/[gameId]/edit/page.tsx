import { getInventoryItem } from "@/database/games/getGame";
import { GameEditForm } from "./GameEditForm";
import { listHolders } from "@/database/holders/listHolders";

type Props = {
  params: {
    gameId: string;
  };
};

export default async function GamePage(props: Props) {
  const data = await getInventoryItem(Number.parseInt(props.params.gameId));
  const holders = await listHolders();

  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-wrap justify-between">
        <GameEditForm
          data={data}
          holders={holders}
          className="flex flex-col justify-center items-center max-w-4/5"
        />
      </div>
    </div>
  );
}
