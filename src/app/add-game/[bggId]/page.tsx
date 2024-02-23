import { fetchBggDetails } from "@/bgg/fetchBggDetails";
import { BggDataSummary } from "@/components/data-display/BggDataSummary";
import { NewGameData, addGame } from "@/database/addGame";
import { listHolders } from "@/database/listHolders";
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
    return <main>Oops, something went wrong :'(</main>;
  }

  const data = bggData[0];

  async function submitGame(formData: FormData) {
    "use server";

    const newGame: NewGameData = {
      bggData: data,
      ownership: formData.get("ownership") as Ownership,
      location: formData.get("location") as Location,
      holderId:
        formData.get("holderId") !== "-1"
          ? parseInt(formData.get("holderId") as string)
          : undefined,
      newHolder:
        formData.get("holderId") === "-1"
          ? (formData.get("newHolder") as string)
          : undefined,
    };

    const submitSuccess = await addGame(newGame);

    if (submitSuccess) {
      redirect("/ListGames");
    }
  }

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
              action={submitGame}
              className="flex flex-col justify-center items-center max-w-4/5"
            ></AddGameForm>
          }
        ></HalfPagePanel>
      </div>
    </div>
  );
}
