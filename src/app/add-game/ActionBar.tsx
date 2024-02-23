import { BggLink } from "@/components/common/BggLink";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ActionBarButton } from "./ActionBarButton";

export function ActionBar({ bggId }: { bggId: number; }) {
  return (
    <ul className="flex flex-row-reverse gap-2 mt-1 mb-1  pt-2 pb-2">
      <li title="Add game">
        <ActionBarButton
          content={<Link href={`/add-game/${bggId}`}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </Link>}
        ></ActionBarButton>
      </li>
      <li title="BoardGameGeek link">
        <ActionBarButton
          content={<BggLink bggId={bggId}></BggLink>}
        ></ActionBarButton>
      </li>
    </ul>
  );
}
