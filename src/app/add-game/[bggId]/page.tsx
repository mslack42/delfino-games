import { fetchBggDetails } from "@/bgg/fetchBggDetails";
import { BggDataSummary } from "@/components/data-display/BggDataSummary";
import { listHolders } from "@/database/holders/listHolders";
import { AddGameForm } from "./AddGameForm";

type Props = {
  params: {
    bggId: string;
  };
};

export default async function AddGame(props: Props) {
  const bggData = await fetchBggDetails(props.params.bggId);
  const holders = await listHolders();

  if (bggData.length === 0) {
    return <main>Oops, something went wrong :&apos(</main>;
  }

  const data = bggData[0];

  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 ">
          <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg">
            <BggDataSummary data={data}></BggDataSummary>
          </div>
        </div>
        <div className="w-full md:w-1/2 ">
          <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg">
            <AddGameForm
              holders={holders}
              bggData={data}
              className="flex flex-col justify-center items-center max-w-4/5"
            ></AddGameForm>
          </div>
        </div>
      </div>
    </div>
  );
}
