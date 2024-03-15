import Link from "next/link";
import { DropDownGroup } from "../../input/DropDown";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";

export async function adminControls(): Promise<DropDownGroup> {
  const items = [
    <Link
      key={1}
      href={ApplicationRoutes.FindAndAddGame}
      className="h-full w-full"
    >
      <p>Add a new game</p>
    </Link>,
    <Link href={ApplicationRoutes.People} key={2} className="h-full w-full">
      Manage holders
    </Link>,
    <Link href={ApplicationRoutes.Users} key={3} className="h-full w-full">
      Manage users
    </Link>,
  ];
  const head = <div>Administration</div>;

  return {
    head,
    items,
  };
}
