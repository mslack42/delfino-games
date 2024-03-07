import { ApiRoutes, ApplicationRoutes } from "@/constants/routes";
import {
  faHandPointUp,
  faPenToSquare,
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { GamesListContext } from "../../GamesListContext";
import { GameCardActionButton } from "./GameCardActionButton";
import { PanelProps } from "../InventoryItemPanel";
import Link from "next/link";

export function GameCardActions(props: PanelProps) {
  const { data } = props;
  const { inventoryData, setInventoryData, actions } =
    useContext(GamesListContext);
  async function changeRotationStatus() {
    try {
      const gameId = data.id;
      const newStatus = !data.dsData.inRotation;

      const res = await fetch(ApiRoutes.ChangeRotationStatus, {
        method: "POST",
        body: JSON.stringify({
          id: gameId,
          newStatus: newStatus,
        }),
      });
      if (!res.ok) {
        // TODO some error handling
      }
      setInventoryData(
        inventoryData.map((v) => {
          if (v.id !== gameId) {
            return v;
          }
          return {
            ...v,
            dsData: {
              ...v.dsData,
              inRotation: newStatus,
            },
          };
        })
      );
    } catch (error: any) {
      //
    }
  }
  return (
    <div className="absolute bottom-0 right-0 rounded-lg p-2 text-sm">
      <ul className="flex flex-col space-y-1">
        {actions.includes("ToggleRotation") && (
          <li>
            <GameCardActionButton
              body={
                data.dsData.inRotation ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquareXmark} />
                )
              }
              onClick={changeRotationStatus}
            />
          </li>
        )}
        {actions.includes("Edit") && (
          <li>
            <GameCardActionButton
              body={
                <Link href={ApplicationRoutes.EditGame(data.id)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              }
            />
          </li>
        )}
        {actions.includes("ToggleRequest") && (
          <li>
            <GameCardActionButton
              body={<FontAwesomeIcon icon={faHandPointUp} />}
            />
          </li>
        )}
      </ul>
    </div>
  );
}
