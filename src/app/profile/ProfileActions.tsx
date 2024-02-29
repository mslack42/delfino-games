import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";

export function ProfileActions() {
  return (
    <div className="text-black h-2 w-full flex justify-end px-6">
      <Link href={"/profile/edit"}>
        <FontAwesomeIcon icon={faPenToSquare} className="h-6"/>
      </Link>
    </div>
  );
}
