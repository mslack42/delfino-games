import Link from "next/link";
import { auth } from "@/auth";
import { DropDownGroup } from "../../input/DropDown";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";

export async function profileControls(
  logoutAction: () => Promise<void>
): Promise<DropDownGroup> {
  const session = await auth();
  const user = session?.user;

  const head = (
    <>
      <div className="h-full w-full">
        {user?.name && user?.name.length < 15 ? user?.name : "User"}
      </div>
    </>
  );

  const items = [
    <Link href={ApplicationRoutes.Profile} key={-2} className="h-full w-full">
      Profile
    </Link>,
    <Link
      href={ApplicationRoutes.ChangePassword}
      key={-3}
      className="h-full w-full"
    >
      Change Password
    </Link>,
    <div key={-1} className="h-full w-full">
      <form action={logoutAction}>
        <button type="submit">Log Out</button>
      </form>
    </div>,
  ];

  return {
    head,
    items,
    name: "Profile Menu",
  };
}
