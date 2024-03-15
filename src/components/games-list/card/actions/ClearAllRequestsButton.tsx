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
        // TODO some error handling
        toast({
          type: "background",
          variant: "destructive",
          title: "Action failed",
        });
        return;
      }
    } catch (error: any) {
      //
      toast({
        type: "background",
        variant: "destructive",
        title: "Action failed",
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
