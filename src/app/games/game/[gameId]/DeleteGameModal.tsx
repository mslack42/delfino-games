"use client";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";
import { useToast } from "@/components/shadcn/use-toast";

type DeleteGameModalProps = {
  deleteId: number | null;
  setDeleteId: Dispatch<SetStateAction<number | null>>;
};
export function DeleteGameModal(props: DeleteGameModalProps) {
  const { deleteId, setDeleteId } = props;
  const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const deleteHandler = async (id: number | undefined | null) => {
    if (id) {
      try {
        const res = await fetch(ApiRoutes.DeleteGame(id!.toString()), {
          method: "DELETE",
        });

        if (!res.ok) {
          if (res.status === 500) {
            toast({
              title: "Failed to delete game - internal failure",
              type: "background",
              variant: "destructive",
            });
          }
          if (res.status === 400) {
            toast({
              title: "Failed to delete game - no game specified",
              type: "background",
              variant: "destructive",
            });
          }
          return;
        }

        setDeleteId(null);
        toast({
          title: "Game deleted successfully",
        });
        router.push(ApplicationRoutes.Games);
      } catch (e) {
        toast({
          title: "Failed to delete game",
          type: "background",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <CustomModal
      isOpen={!!deleteId}
      title={<b>Are you sure you want to delete this game?</b>}
      subtitle={<>This action is permanent.</>}
      onClose={() => {
        setDeleteId(null);
        setDeleteConfirmed(false);
      }}
    >
      <div>
        <div className="flex flex-row justify-evenly space-x-2">
          <input
            type="text"
            placeholder="type 'confirm delete'"
            onChange={(evt) => {
              setDeleteConfirmed(evt.currentTarget.value === "confirm delete");
            }}
            className="px-2"
          ></input>
          <div className="flex flex-row justify-end w-full space-x-2">
            <CustomButton
              type="button"
              innerText={"Yes"}
              className="rounded p-2"
              onClick={() => deleteHandler(deleteId)}
              disabled={!deleteConfirmed}
            />
            <CustomButton
              type="button"
              innerText={"No"}
              className="rounded p-2"
              actionType="cancel"
              onClick={() => setDeleteId(null)}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
