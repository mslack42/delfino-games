import Link from "next/link";
import { DropDownGroup } from "../../input/DropDown";
import { listHolders } from "@/database/holders/listHolders";
import { ApplicationRoutes } from "@/constants/routes";

export async function gamesCollection(): Promise<DropDownGroup> {
  const holders = (await listHolders())
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((h) => h.heldGames.length > 0);

  const head = <div>Games Collection</div>;
  const items = [
    <Link key={-1} href={ApplicationRoutes.Games} className="h-full w-full">
      <b>All Games</b>
    </Link>,
    <Link
      key={-2}
      href={ApplicationRoutes.GameRequests}
      className="h-full w-full"
    >
      <b>Requested Games</b>
    </Link>,
    ...holders.map((h) => (
      <Link
        key={h.id}
        href={ApplicationRoutes.PersonsGames(h.name)}
        className="h-full w-full"
      >
        {h.name}
      </Link>
    )),
  ];

  return {
    head,
    items,
  };
}
