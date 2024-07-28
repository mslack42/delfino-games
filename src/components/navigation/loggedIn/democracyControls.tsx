import Link from "next/link";
import { DropDownGroup } from "../../input/DropDown";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";

export async function democracyControls(): Promise<DropDownGroup> {
  const head = <div>Democracy</div>;
  const items = [
    <Link
      key={-10}
      href={ApplicationRoutes.SuggestGame}
      className="h-full w-full"
    >
      Suggest new games
    </Link>,
    <Link key={-20} href={ApplicationRoutes.Vote} className="h-full w-full">
      Vote
    </Link>,
  ].filter((jsx) => jsx !== null);

  return {
    head,
    items,
    name: "Games Collection Menu",
  };
}
