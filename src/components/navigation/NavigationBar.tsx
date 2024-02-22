import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
import Link from "next/link";
import { signOut } from "@/auth";
import { LoggedInOnly } from "../auth/LoggedInOnly";
import { LoggedOutOnly } from "../auth/LoggedOutOnly";
import { RoleCheck } from "../auth/RoleCheck";

export const NavigationBar = async () => {
  const logoutAction = async () => {
    "use server";
    await signOut();
  };

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
              <li className="px-2">
                <Link href="/ListGames">
                  <p>See all games</p>
                </Link>
              </li>
              <RoleCheck
              type="oneOf"
              roles={["Admin"]}
                content={
                  <li className="px-2">
                    <Link href="/AddGames">
                      <p>Add a new game</p>
                    </Link>
                  </li>
                }
              />
              <LoggedInOnly
                content={
                  <li className="px-2">
                    <form action={logoutAction}>
                      <button>Log Out</button>
                    </form>
                  </li>
                }
              />
              <LoggedOutOnly
                content={
                  <li className="px-2">
                    <Link href="/LogIn">
                      <p>Login</p>
                    </Link>
                  </li>
                }
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

