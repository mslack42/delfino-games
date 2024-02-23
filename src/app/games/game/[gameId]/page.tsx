import { BggDataSummary } from "@/components/data-display/BggDataSummary";
import { HalfPagePanel } from "@/components/data-display/HalfPagePanel";
import { getInventoryItem } from "@/database/getGame";
import { createBggDataSummaryFromInventoryItem } from "@/util/data-conversion";

type Props = {
  params: {
    gameId: string;
  };
};

export default async function GamePage(props: Props) {
  const data = await getInventoryItem(Number.parseInt(props.params.gameId));

  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-wrap justify-between">
        <HalfPagePanel
          content={<BggDataSummary data={createBggDataSummaryFromInventoryItem(data)}></BggDataSummary>}
        ></HalfPagePanel>
      </div>
    </div>
  );
}
