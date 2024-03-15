import Link from "next/link";
import { DropDownGroup } from "../../input/DropDown";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { isNotRole } from "@/util/auth/server/isNotRole";

export async function gamesCollection(): Promise<DropDownGroup> {
  const isVerified = await isNotRole("Unverified");

  const head = <div>Games Collection</div>;
  const items = [
    <Link key={-1} href={ApplicationRoutes.Games} className="h-full w-full">
      All Games
    </Link>,
    <Link
      key={-2}
      href={ApplicationRoutes.GameRequests}
      className="h-full w-full"
    >
      Requested Games
    </Link>,
    isVerified ? (
      <Link
        key={-3}
        href={ApplicationRoutes.GamesByGamesHolders}
        className="h-full w-full"
      >
        By Games Holder
      </Link>
    ) : null,
  ].filter((jsx) => jsx !== null);

  return {
    head,
    items,
  };
}
