import { ApiRoutes } from "@/constants/routes";
import {
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { GamesListContext } from "../../GamesListContext";
import { GameCardActionButton } from "./GameCardActionButton";
import { useToast } from "@/components/shadcn/use-toast";
import { InventoryItem } from "@/database/types";

type GameRotationButtonProps = {
  data: InventoryItem;
};
export function GameRotationButton(props: GameRotationButtonProps) {
  const { data } = props;
  const { toast } = useToast();
  const { inventoryData, setInventoryData } = useContext(GamesListContext);
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
      toast({
        type: "background",
        title: newStatus
          ? "Game added to rotation"
          : "Game removed from rotation",
      });
    } catch (error: any) {
      //
    }
  }
  return (
    <>
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
    </>
  );
}
