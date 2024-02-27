import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
import Link from "next/link";
import { signOut } from "@/auth";
import { LoggedInOnly } from "../auth/LoggedInOnly";
import { LoggedOutOnly } from "../auth/LoggedOutOnly";
import { RoleCheck } from "../auth/RoleCheck";
import { DropDown } from "../input/DropDown";
import { listHolders } from "@/database/listHolders";

export const NavigationBar = async () => {
  const logoutAction = async () => {
    "use server";
    await signOut();
  };

  const holders = (await listHolders()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

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
              <li className="px-2 hover:bg-teal-500">
                <LoggedInOnly
                  content={
                    <DropDown
                      head={
                        <div>
                          <p>Game Collection</p>
                        </div>
                      }
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
              <RoleCheck
                type="oneOf"
                roles={["Admin"]}
                content={
                  <li className="px-2">
                    <Link href="/add-game">
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
                    <Link href="/login">
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
