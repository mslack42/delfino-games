import { fetchBggDetails } from "@/bgg/fetchBggDetails";
import { listHolders } from "@/database/holders/listHolders";
import { AddGame } from "./AddGame";

type Props = {
  params: {
    bggId: string;
  };
};

export default async function AddGamePage(props: Props) {
  const bggData = await fetchBggDetails(props.params.bggId, true);
  const holders = await listHolders();

  if (bggData.length === 0) {
    return <main>Oops, something went wrong :&apos(</main>;
  }

  const data = bggData[0];

  return <AddGame data={data} holders={holders} />;
}
