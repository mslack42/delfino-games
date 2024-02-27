import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { LoggedInOnly } from "../auth/LoggedInOnly";
import { LoggedOutOnly } from "../auth/LoggedOutOnly";
import { RoleCheck } from "../auth/RoleCheck";
import { DropDown } from "../input/DropDown";
import { listHolders } from "@/database/listHolders";

export const NavigationBar = async () => {
  return (
    <div className="w-full h-16 bg-teal-400 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full align-middle">
          <Link href="/" className="flex bottom-0">
            <FontAwesomeIcon icon={faDice} className="h-12 text-white  " />
            <div className="h-12 flex align-text-bottom justify-end flex-col pl-2">
              <h1 className="text-xl text-white align-text-bottom">
                Delfino Games
              </h1>
            </div>
          </Link>
          <div className="flex justify-end flex-col h-full pb-3">
            <ul className="flex text-white divide-solid divide-x-2">
              <GamesCollection />
              <AdminControls />
              <ProfileControls />
            </ul>
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
            <Link href="/login">
              <p>Login</p>
            </Link>
          }
        />
        <LoggedInOnly
          content={
            <DropDown
              head={<div>{user?.name}</div>}
              items={[
                <div key={-2} className="hover:bg-teal-500 w-full">
                  Profile
                </div>,
                <div key={-1} className="hover:bg-teal-500 w-full">
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
    <li className="px-2">
      <RoleCheck
        type="oneOf"
        roles={["Admin"]}
        content={
          <DropDown
            head={<div>Administration</div>}
            items={[
              <Link
                key={1}
                href="/add-game"
                className="hover:bg-teal-500 w-full"
              >
                <p className="hover:bg-teal-500 w-full">Add a new game</p>
              </Link>,
              <Link href="/people" key={2} className="hover:bg-teal-500 w-full">
                Manage holders
              </Link>,
              <div key={3} className="hover:bg-teal-500 w-full">
                Manage users
              </div>,
            ]}
          ></DropDown>
        }
      />
    </li>
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
              <Link
                key={-1}
                href={"/games"}
                className="hover:bg-teal-500 w-full"
              >
                <b>All Games</b>
              </Link>,
              ...holders.map((h) => (
                <Link
                  key={h.id}
                  href={"/games/holder/" + h.name}
                  className="hover:bg-teal-500 w-full"
                >
                  {h.name}
                </Link>
              )),
            ]}
          ></DropDown>
        }
      ></LoggedInOnly>
      <LoggedOutOnly
        content={
          <Link href="/games">
            <p>Games</p>
          </Link>
        }
      ></LoggedOutOnly>
    </li>
  );
}
