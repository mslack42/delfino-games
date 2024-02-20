import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
import Link from "next/link";

export const NavigationBar = () => {
  return (
    <div className="w-full h-16 bg-teal-400 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full align-middle">
          <Link href="/" className="flex bottom-0">
            <FontAwesomeIcon
              icon={faDice}
              className="h-12 text-white float-left "
            />
            <div className="h-12 flex align-text-bottom justify-end flex-col pl-2">
              <h1 className="text-xl text-white align-text-bottom fle">
                Delfino Games
              </h1>
            </div>
          </Link>
          <div className="flex justify-end flex-col h-full pb-3">
            <ul className="flex gap-x-3 text-white">
              |
              <li>
                <Link href="/ListGames">
                  <p>See all games</p>
                </Link>
              </li>
              |
              <li>
                <Link href="/AddGames">
                  <p>Add a new game</p>
                </Link>
              </li>
              |
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
