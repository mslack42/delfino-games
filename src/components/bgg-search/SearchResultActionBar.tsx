import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { ActionBarButton } from "./ActionBarButton";
import Link from "next/link";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BggLink } from "@/components/common/BggLink";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";
import { Conditional } from "../common/Conditional";

type ActionSet = "addGame" | "suggestGame";

export function SearchResultActionBar({
  bggId,
  actionSet,
}: {
  bggId: number;
  actionSet: ActionSet;
}) {
  return (
    <>
      <div className="relative h-full bottom-0 flex flex-col justify-end">
        <ul className="flex flex-row-reverse gap-2  p-2">
          <Conditional when={actionSet == "addGame"}>
            <li title="Add game">
              <ActionBarButton>
                <Link href={ApplicationRoutes.AddGame(bggId)}>
                  <CustomFontAwesomeIcon icon={faPlus}></CustomFontAwesomeIcon>
                </Link>
              </ActionBarButton>
            </li>
          </Conditional>
          <li title="BoardGameGeek link">
            <ActionBarButton>
              <BggLink bggId={bggId}></BggLink>
            </ActionBarButton>
          </li>
        </ul>
      </div>
    </>
  );
}
