import { getInventoryItem } from "@/database/games/getGame";
import { GameEditForm } from "./GameEditForm";
import { listHolders } from "@/database/holders/listHolders";
import { fetchBggDetails } from "@/bgg/fetchBggDetails";

type Props = {
  params: {
    gameId: string;
  };
};

export default async function GamePage(props: Props) {
  const data = await getInventoryItem(Number.parseInt(props.params.gameId));
  const fullExpansionsList =
    (
      await fetchBggDetails({
        idsString: data.bggData.bggId.toString(),
        includeExpansionsNested: true,
      })
    )[0].expansions ?? [];
  const holders = await listHolders();

  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-wrap justify-between">
        <GameEditForm
          data={data}
          expansions={fullExpansionsList}
          holders={holders}
          className="flex flex-col justify-center items-center max-w-4/5"
        />
      </div>
    </div>
  );
}
