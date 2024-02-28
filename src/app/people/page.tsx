import { listHolders } from "@/database/holders/listHolders";
import { PeopleTable } from "./PeopleTable";

export default async function People() {
  const holders = await listHolders();

  return (
    <div className="text-center">
      <h1 className="text-2xl pt-4">People</h1>
      <p>Below is a list of all boardgame-carrying people.</p>
      <br />
      <PeopleTable holders={holders} />
    </div>
  );
}
