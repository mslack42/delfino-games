import { ApplicationRoutes } from "@/constants/routes";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { GamesListContext } from "../../GamesListContext";
import { GameCardActionButton } from "./GameCardActionButton";
import { PanelProps } from "../InventoryItemPanel";
import Link from "next/link";
import { GameRotationButton } from "./GameRotationButton";
import { ToggleRequestButton } from "./ToggleRequestButton";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";

export function GameCardActions(props: PanelProps) {
  const { data } = props;
  const { actions } = useContext(GamesListContext);

  return (
    <div className="absolute bottom-0 right-0 rounded-lg p-2 text-sm">
      <ul className="flex flex-col space-y-1">
        {actions.includes("ToggleRotation") && (
          <li>
            <GameRotationButton data={data} />
          </li>
        )}
        {actions.includes("Edit") && (
          <li>
            <GameCardActionButton
              body={
                <Link href={ApplicationRoutes.EditGame(data.id)}>
                  <CustomFontAwesomeIcon icon={faPenToSquare} />
                </Link>
              }
            />
          </li>
        )}
        {actions.includes("ToggleRequest") && (
          <li>
            <ToggleRequestButton gameId={data.id} />
          </li>
        )}
      </ul>
    </div>
  );
}
