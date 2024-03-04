import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { LoggedInOnly } from "../auth/LoggedInOnly";
import { LoggedOutOnly } from "../auth/LoggedOutOnly";
import { RoleCheck } from "../auth/RoleCheck";
import { DropDown, DropDownGroup, DropDownGroupCollection } from "../input/DropDown";
import { listHolders } from "@/database/holders/listHolders";
import { ApplicationRoutes } from "@/constants/routes";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const NavigationBar = async () => {

  const menu: DropDownGroupCollection = {
    "game": await gamesCollection(),
    "admin": await adminControls(),
    "profile": await profileControls()
  }
  return (
    <div className="w-full h-16 bg-teal-400 sticky top-0  z-[500]">
      <div className="bg-teal-400 h-full">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full align-middle">
            <Link href={ApplicationRoutes.Home} className="flex bottom-0">
              <FontAwesomeIcon icon={faDice} className="h-12 text-white  " />
              <div className="h-12 flex align-text-bottom justify-end flex-col pl-2">
                <h1 className="text-xl text-white align-text-bottom">
                  Delfino Games
                </h1>
              </div>
            </Link>
            <div className="hidden md:flex justify-end flex-col h-full pb-3 z-[501]">
              <ul className="flex text-white divide-solid divide-x-2">
                <li className="px-2">
                  <DropDown type="Single" {...menu["game"]}/>
                </li>
                <RoleCheck type="oneOf" roles={["Admin"]} content={<li className="px-2"><DropDown type="Single" {...menu["admin"]} /></li>}></RoleCheck>
                <li className="px-2">
                  <DropDown type="Single" {...menu["profile"]} />
                </li>
              </ul>
            </div>
            <div className="flex md:hidden justify-end flex-col h-full pb-3 z-[501]">
              <DropDown
                type="Multi"
                head={
                  <div className="h-full flex-col justify-center">
                    <FontAwesomeIcon icon={faBars} className="text-white h-8" />
                  </div>
                }
                items={[
                  menu["game"],
                  menu["admin"],
                  menu["profile"]
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


async function profileControls(): Promise<DropDownGroup> {
  const logoutAction = async () => {
    "use server";
    await signOut();
  };
  const session = await auth();
  const user = session?.user;

  const head = (
    <>
      <LoggedOutOnly
        content={
          <Link href={ApplicationRoutes.LogIn} className="h-full w-full">
            <p>Login</p>
          </Link>
        }
      />
      <LoggedInOnly content={
        <div className="h-full w-full">{user?.name && user?.name.length < 15 ? user?.name : "User"}</div>
      } />
    </>

  );

  const items = [
    <Link href={ApplicationRoutes.Profile} key={-2} className="h-full w-full">
      Profile
    </Link>,
    <Link href={ApplicationRoutes.ChangePassword} key={-3} className="h-full w-full">
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
    items
  }
}

async function adminControls(): Promise<DropDownGroup> {
  const items = [
    <Link key={1} href={ApplicationRoutes.FindAndAddGame} className="h-full w-full">
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
    items
  }
}

async function gamesCollection(): Promise<DropDownGroup> {
  const holders = (await listHolders()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const head = <div>Games Collection</div>;
  const items = [
    <Link key={-1} href={ApplicationRoutes.Games} className="h-full w-full">
      <b>All Games</b>
    </Link>,
    ...holders.map((h) => (
      <Link key={h.id} href={ApplicationRoutes.PersonsGames(h.name)} className="h-full w-full">
        {h.name}
      </Link>
    )),
  ];

  return {
    head,
    items
  }
}
