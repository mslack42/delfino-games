import { BggDataSummary } from "@/components/data-display/BggDataSummary";
import { getInventoryItem } from "@/database/games/getGame";
import { createBggDataSummaryFromInventoryItem } from "@/util/data-conversion";
import { DsDataSummary } from "../DsDataSummary";

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
        <div className="w-full md:w-1/2 ">
          <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg">
            EDITPAGE
            <BggDataSummary
              data={createBggDataSummaryFromInventoryItem(data)}
            ></BggDataSummary>
          </div>
        </div>
        <div className="w-full md:w-1/2 ">
          <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg">
            <DsDataSummary data={data.dsData}></DsDataSummary>
          </div>
        </div>
      </div>
    </div>
  );
}
