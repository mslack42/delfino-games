import Link from "next/link";
import { auth, signOut } from "@/auth";
import { DropDownGroup } from "../../input/DropDown";
import { ApplicationRoutes } from "@/constants/routes";

export async function profileControls(): Promise<DropDownGroup> {
  const logoutAction = async () => {
    "use server";
    await signOut();
  };
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
        <button>Log Out</button>
      </form>
    </div>,
  ];

  return {
    head,
    items,
  };
}
