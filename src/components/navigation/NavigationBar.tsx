import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { LoggedInOnly } from "../auth/LoggedInOnly";
import { LoggedOutOnly } from "../auth/LoggedOutOnly";
import { RoleCheck } from "../auth/RoleCheck";
import { DropDown } from "../input/DropDown";
import { listHolders } from "@/database/holders/listHolders";
import { ApplicationRoutes } from "@/constants/routes";

export const NavigationBar = async () => {
  return (
    <div className="w-full h-16 bg-teal-400 sticky top-0  z-[500]">
      <div className="bg-teal-400">
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
            <div className="flex justify-end flex-col h-full pb-3 z-[501]">
              <ul className="flex text-white divide-solid divide-x-2">
                <GamesCollection />
                <AdminControls />
                <ProfileControls />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

async function ProfileControls() {
  const logoutAction = async () => {
    "use server";
    await signOut();
  };
  const session = await auth();
  const user = session?.user;
  return (
    <>
      <li className="px-2">
        <LoggedOutOnly
          content={
            <Link href={ApplicationRoutes.LogIn}>
              <p>Login</p>
            </Link>
          }
        />
        <LoggedInOnly
          content={
            <DropDown
              head={<div>{user?.name}</div>}
              items={[
                <Link href={ApplicationRoutes.Profile} key={-2}>
                  Profile
                </Link>,
                <Link href={ApplicationRoutes.ChangePassword} key={-3}>
                  Change Password
                </Link>,
                <div key={-1}>
                  <form action={logoutAction}>
                    <button>Log Out</button>
                  </form>
                </div>,
              ]}
            ></DropDown>
          }
        />
      </li>
    </>
  );
}

async function AdminControls() {
  return (
    <RoleCheck
      type="oneOf"
      roles={["Admin"]}
      content={
        <li className="px-2">
          <DropDown
            head={<div>Administration</div>}
            items={[
              <Link key={1} href={ApplicationRoutes.FindAndAddGame}>
                <p>Add a new game</p>
              </Link>,
              <Link href={ApplicationRoutes.People} key={2}>
                Manage holders
              </Link>,
              <Link href={ApplicationRoutes.Users} key={3}>
                Manage users
              </Link>,
            ]}
          ></DropDown>
        </li>
      }
    />
  );
}

async function GamesCollection() {
  const holders = (await listHolders()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return (
    <li className="px-2">
      <LoggedInOnly
        content={
          <DropDown
            head={<div>Games Collection</div>}
            items={[
              <Link key={-1} href={ApplicationRoutes.Games}>
                <b>All Games</b>
              </Link>,
              ...holders.map((h) => (
                <Link key={h.id} href={ApplicationRoutes.PersonsGames(h.name)}>
                  {h.name}
                </Link>
              )),
            ]}
          ></DropDown>
        }
      ></LoggedInOnly>
      <LoggedOutOnly
        content={
          <Link href={ApplicationRoutes.Games}>
            <p>Games</p>
          </Link>
        }
      ></LoggedOutOnly>
    </li>
  );
}
