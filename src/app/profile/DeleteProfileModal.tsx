"use client";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { Dispatch, SetStateAction, useState } from "react";
import { CustomButton } from "@/components/input/CustomButton";
import { CustomModal } from "@/components/common/CustomModal";
import { useRouter } from "next/navigation";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { useToast } from "@/components/shadcn/use-toast";

type DeleteProfileProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export function DeleteProfileModal({ open, setOpen }: DeleteProfileProps) {
  const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const deleteHandler = async () => {
    try {
      const res = await fetch(ApiRoutes.DeleteProfile, { method: "DELETE" });
      if (!res.ok) {
        if (res.status === 500) {
          toast({
            title: "Failed to delete profile - internal failure",
            type: "background",
            variant: "destructive",
          });
        }
        if (res.status === 400) {
          toast({
            title: "Failed to delete profile - validation error",
            type: "background",
            variant: "destructive",
          });
        }
        return;
      }

      toast({ title: "Profile delete successfully" });
      router.push(ApplicationRoutes.Home);
      router.refresh();
    } catch (e) {
      toast({
        title: "Failed to delete profile",
        type: "background",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <CustomModal
        isOpen={!!open}
        title={<b>Are you sure you want to delete your profile?</b>}
        subtitle={<>This action is permanent.</>}
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
