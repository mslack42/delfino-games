import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext, useMemo } from "react";
import { GamesListContext } from "../../GamesListContext";
import { GameCardActionButton } from "./GameCardActionButton";
import { PanelProps } from "../InventoryItemPanel";
import Link from "next/link";
import { GameRotationButton } from "./GameRotationButton";
import { ToggleRequestButton } from "./ToggleRequestButton";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";
import { ClearAllRequestsButton } from "./ClearAllRequestsButton";
import { GameRequestsContext } from "@/components/game-requests/GameRequestContext";
import { Conditional } from "@/components/common/Conditional";

export function GameCardActions(props: PanelProps) {
  const { data } = props;
  const { actions } = useContext(GamesListContext);
  const { allRequests } = useContext(GameRequestsContext);
  const relevantRequests = useMemo(
    () => allRequests.filter((r) => r.game.id === props.data.id),
    [allRequests, props.data.id]
  );

  return (
    <div className="absolute bottom-0 right-0 rounded-lg pr-2 pb-2 text-sm pointer-events-none">
      <ul className="flex flex-col space-y-1">
        <Conditional
          when={
            actions.includes("ClearAllRequests") && relevantRequests.length > 2
          }
        >
          <li>
            <ClearAllRequestsButton gameId={data.id} gameName={data.name} />
          </li>
        </Conditional>
        <Conditional when={actions.includes("ToggleRotation")}>
          <li>
            <GameRotationButton data={data} />
          </li>
        </Conditional>
        <Conditional when={actions.includes("Edit")}>
          <li>
            <Link
              href={ApplicationRoutes.EditGame(data.id)}
              aria-label="Edit game"
            >
              <GameCardActionButton
                body={<CustomFontAwesomeIcon icon={faPenToSquare} />}
                aria-label="Edit game"
              />
            </Link>
          </li>
        </Conditional>
        <Conditional when={actions.includes("ToggleRequest")}>
          <li>
            <ToggleRequestButton gameId={data.id} />
          </li>
        </Conditional>
      </ul>
    </div>
  );
}
