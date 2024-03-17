"use client";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { Dispatch, SetStateAction, useState } from "react";
import { CustomButton } from "@/components/input/CustomButton";
import { CustomModal } from "@/components/common/CustomModal";
import { useRouter } from "next/navigation";
import { ApiRoutes } from "@/constants/ApiRoutes";

type DeleteProfileProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export function DeleteProfileModal({ open, setOpen }: DeleteProfileProps) {
  const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);
  const router = useRouter();

  const deleteHandler = async () => {
    await fetch(ApiRoutes.DeleteProfile, { method: "DELETE" });
    router.push(ApplicationRoutes.Home);
    router.refresh();
  };

  return (
    <>
      <CustomModal
        isOpen={!!open}
        title={<b>Are you sure you want to delete your profile?</b>}
        subtitle={<p>This action is permanent.</p>}
        onClose={() => {
          setDeleteConfirmed(false);
          setOpen(false);
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
                onClick={() => deleteHandler()}
                disabled={!deleteConfirmed}
              />
              <CustomButton
                type="button"
                innerText={"No"}
                className="rounded p-2"
                actionType="cancel"
                onClick={() => {
                  setDeleteConfirmed(false);
                  setOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
}
