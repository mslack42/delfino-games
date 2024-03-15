"use client";
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";
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

  const deleteHandler = async (holderId: number | undefined | null) => {
    if (holderId) {
      await fetch(ApiRoutes.DeletePerson(holderId!), { method: "DELETE" });
      onClose();
      router.refresh();
    }
  };
  return (
    <>
      <CustomModal
        isOpen={!!deleteHolder}
        title={<b>Are you sure you want to delete {deleteHolder?.name}?</b>}
        subtitle={<p>This action is permanent.</p>}
        content={
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
        }
        onClose={() => {
          setDeleteConfirmed(false);
          onClose();
        }}
      ></CustomModal>
    </>
  );
}
