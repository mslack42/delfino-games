import { ApiRoutes } from "@/constants/ApiRoutes";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { GameCardActionButton } from "./GameCardActionButton";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";
import { GameRequestsContext } from "@/components/game-requests/GameRequestContext";
import { useToast } from "@/components/shadcn/use-toast";

type ClearAllRequestsButtonProps = {
  gameId: number;
  gameName: string;
};
export function ClearAllRequestsButton(props: ClearAllRequestsButtonProps) {
  const [openModal, setOpenModal] = useState(false);
  const { toast } = useToast();
  const { allRequests, setAllRequests } = useContext(GameRequestsContext);
  const clearAllRequests = async () => {
    try {
      const res = await fetch(ApiRoutes.ClearGameRequests, {
        method: "POST",
        body: JSON.stringify({
          gameId: props.gameId,
        }),
      });
      if (!res.ok) {
        if (res.status === 500) {
          toast({
            title: "Failed to clear requests - internal failure",
            type: "background",
            variant: "destructive",
          });
        }
        if (res.status === 400) {
          toast({
            title: "Failed to clear requests - validation failed",
            type: "background",
            variant: "destructive",
          });
        }
        return;
      }
    } catch (error: any) {
      toast({
        title: "Failed to clear requests",
        type: "background",
        variant: "destructive",
      });
      return;
    }

    const newRequestList = [...allRequests].filter(
      (r) => !(r.game.id === props.gameId)
    );

    setAllRequests(() => newRequestList);
    setOpenModal(false);
  };
  return (
    <>
      <GameCardActionButton
        body={<CustomFontAwesomeIcon icon={faTrash} />}
        onClick={() => setOpenModal(true)}
        aria-label="Clear all requests"
      />
      <CustomModal
        isOpen={openModal}
        title={
          <b>
            Are you sure you want to clear all requests for{" "}
            <i>{props.gameName}</i>?
          </b>
        }
        onClose={() => setOpenModal(false)}
      >
        <div>
          <div className="flex flex-row justify-end w-full space-x-2">
            <CustomButton
              type="button"
              innerText={"Yes"}
              className="rounded p-2"
              onClick={() => clearAllRequests()}
            />
            <CustomButton
              type="button"
              innerText={"No"}
              className="rounded p-2"
              actionType="cancel"
              onClick={() => setOpenModal(false)}
            />
          </div>
        </div>
      </CustomModal>
    </>
  );
}
