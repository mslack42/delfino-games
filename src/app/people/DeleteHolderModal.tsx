"use client";
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";
import { useToast } from "@/components/shadcn/use-toast";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { Person } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteModalProps = {
  holder: Person | null;
  onClose: () => void;
};
export function DeleteHolderModal(props: DeleteModalProps) {
  const { holder: deleteHolder, onClose } = props;
  const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const deleteHandler = async (holderId: number | undefined | null) => {
    if (holderId) {
      try {
        const res = await fetch(ApiRoutes.DeletePerson(holderId!), {
          method: "DELETE",
        });
        if (!res.ok) {
          if (res.status === 500) {
            toast({
              title: "Failed to delete holder - internal failure",
              type: "background",
              variant: "destructive",
            });
          }
          if (res.status === 400) {
            toast({
              title: "Failed to delete holder - validation failure",
              type: "background",
              variant: "destructive",
            });
          }
          return;
        }

        onClose();
        router.refresh();
      } catch (e) {
        toast({
          title: "Failed to delete holder",
          type: "background",
          variant: "destructive",
        });
      }
    }
  };
  return (
    <>
      <CustomModal
        isOpen={!!deleteHolder}
        title={<b>Are you sure you want to delete {deleteHolder?.name}?</b>}
        subtitle={<p>This action is permanent.</p>}
        onClose={() => {
          setDeleteConfirmed(false);
          onClose();
        }}
      >
        <div>
          <div className="flex flex-row justify-evenly space-x-2">
            <input
              type="text"
              placeholder="type 'confirm delete'"
              onChange={(evt) => {
                setDeleteConfirmed(
                  evt.currentTarget.value === "confirm delete"
                );
              }}
              className="px-2"
            ></input>
            <div className="flex flex-row justify-end w-full space-x-2">
              <CustomButton
                type="button"
                innerText={"Yes"}
                className="rounded p-2"
                onClick={() => deleteHandler(deleteHolder?.id)}
                disabled={!deleteConfirmed}
              />
              <CustomButton
                type="button"
                innerText={"No"}
                className="rounded p-2"
                actionType="cancel"
                onClick={() => {
                  setDeleteConfirmed(false);
                  onClose();
                }}
              />
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
}
