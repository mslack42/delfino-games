import { fetchBggDetails } from "@/bgg/fetchBggDetails";
import { BggDataSummary } from "@/components/data-display/BggDataSummary";
import { NewGameData, addGame } from "@/database/games/addGame";
import { listHolders } from "@/database/holders/listHolders";
import { Ownership, Location } from "@prisma/client";
import { redirect } from "next/navigation";
import { AddGameForm } from "./AddGameForm";
import { HalfPagePanel } from "../../../components/data-display/HalfPagePanel";

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
        <HalfPagePanel
          content={<BggDataSummary data={data}></BggDataSummary>}
        ></HalfPagePanel>
        <HalfPagePanel
          content={
            <AddGameForm
              holders={holders}
              bggData={data}
              className="flex flex-col justify-center items-center max-w-4/5"
            ></AddGameForm>
          }
        ></HalfPagePanel>
      </div>
    </div>
  );
}
