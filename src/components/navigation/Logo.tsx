import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
import Link from "next/link";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";

export function Logo() {
  return (
    <>
      <Link href={ApplicationRoutes.Home} className="flex bottom-0">
        <FontAwesomeIcon icon={faDice} className="h-12 text-white  " />
        <div className="h-12 flex align-text-bottom justify-end flex-col pl-2">
          <h1 className="text-2xl text-white align-text-bottom">
            Delfino Games
          </h1>
        </div>
      </Link>
    </>
  );
}
