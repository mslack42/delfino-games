import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionBarButton } from "./ActionBarButton";
import Link from "next/link";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BggLink } from "@/components/common/BggLink";

export function SearchResultActionBar({ bggId }: { bggId: number }) {
  return (
    <>
      <div className="relative h-full bottom-0 flex flex-col justify-end">
        <ul className="flex flex-row-reverse gap-2  p-2">
          <li title="Add game">
            <ActionBarButton
              content={
                <Link href={ApplicationRoutes.AddGame(bggId)}>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </Link>
              }
            ></ActionBarButton>
          </li>
          <li title="BoardGameGeek link">
            <ActionBarButton
              content={<BggLink bggId={bggId}></BggLink>}
            ></ActionBarButton>
          </li>
        </ul>
      </div>
    </>
  );
}
