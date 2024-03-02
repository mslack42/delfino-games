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
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NavigationSubMenu } from "./NavigationSubMenu";
import { twJoin } from "tailwind-merge";

export const NavigationBar = async () => {
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
                <GamesCollection depth={"Unnested"} />
                <AdminControls depth={"Unnested"} />
                <ProfileControls depth={"Unnested"} />
              </ul>
            </div>
            <div className="flex md:hidden justify-end flex-col h-full pb-3 z-[501]">
              <DropDown
                head={
                  <div className="h-full flex-col justify-center">
                    <FontAwesomeIcon icon={faBars} className="text-white h-8" />
                  </div>
                }
                items={[
                  <span key={1}>
                    <GamesCollection depth={"Nested"} />
                  </span>,
                  <span key={2}>
                    <AdminControls depth={"Nested"} />
                  </span>,
                  <span key={3} className="">
                    <ProfileControls depth={"Nested"} />
                  </span>,
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type ControlsProps = {
  depth: "Nested" | "Unnested";
};

async function ProfileControls(props: ControlsProps) {
  const logoutAction = async () => {
    "use server";
    await signOut();
  };
  const session = await auth();
  const user = session?.user;

  const head = (
    <div>{user?.name && user?.name.length < 15 ? user?.name : "User"}</div>
  );

  const items = [
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
  ];
  return (
    <>
      <li className={twJoin("", props.depth === "Unnested" ? "px-2" : "")}>
        <LoggedOutOnly
          content={
            <Link href={ApplicationRoutes.LogIn}>
              <p>Login</p>
            </Link>
          }
        />
        <LoggedInOnly
          content={
            <NavigationSubMenu depth={props.depth} head={head} items={items} />
          }
        />
      </li>
    </>
  );
}

async function AdminControls(props: ControlsProps) {
  const items = [
    <Link key={1} href={ApplicationRoutes.FindAndAddGame}>
      <p>Add a new game</p>
    </Link>,
    <Link href={ApplicationRoutes.People} key={2}>
      Manage holders
    </Link>,
    <Link href={ApplicationRoutes.Users} key={3}>
      Manage users
    </Link>,
  ];
  const head = <div>Administration</div>;

  return (
    <RoleCheck
      type="oneOf"
      roles={["Admin"]}
      content={
        <li className={twJoin("", props.depth === "Unnested" ? "px-2" : "")}>
          <NavigationSubMenu depth={props.depth} head={head} items={items} />
        </li>
      }
    />
  );
}

async function GamesCollection(props: ControlsProps) {
  const holders = (await listHolders()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const head = <div>Games Collection</div>;
  const items = [
    <Link key={-1} href={ApplicationRoutes.Games}>
      <b>All Games</b>
    </Link>,
    ...holders.map((h) => (
      <Link key={h.id} href={ApplicationRoutes.PersonsGames(h.name)}>
        {h.name}
      </Link>
    )),
  ];

  return (
    <li className={twJoin("", props.depth === "Unnested" ? "px-2" : "")}>
      <LoggedInOnly
        content={
          <NavigationSubMenu depth={props.depth} head={head} items={items} />
        }
      ></LoggedInOnly>
      <LoggedOutOnly
        content={
          <Link href={ApplicationRoutes.Games} className="hover:bg-teal-400">
            <p>Games</p>
          </Link>
        }
      ></LoggedOutOnly>
    </li>
  );
}
