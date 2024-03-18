"use client";
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";
import { useState } from "react";
import { UserModalProps, UserType } from "./UserTable";
import { useRouter } from "next/navigation";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { useToast } from "@/components/shadcn/use-toast";

export function DeleteUserModal({ user, setUser }: UserModalProps) {
  const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const deleteHandler = async (user: UserType) => {
    if (user && deleteConfirmed) {
      try {
        const res = await fetch(ApiRoutes.DeleteUser(user.id), {
          method: "DELETE",
        });
        if (!res.ok) {
          if (res.status === 500) {
            toast({
              title: "Failed to delete user - internal failure",
              type: "background",
              variant: "destructive",
            });
          }
          if (res.status === 400) {
            toast({
              title: "Failed to delete user - validation failed",
              type: "background",
              variant: "destructive",
            });
          }
          return;
        }
        setUser(null);
        setDeleteConfirmed(false);
        router.refresh();
      } catch (e) {
        toast({
          title: "Failed to delete user",
          type: "background",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <CustomModal
        isOpen={!!user}
        title={<b>Are you sure you want to delete {user?.name}?</b>}
        subtitle={<p>This action is permanent.</p>}
        onClose={() => {
          setUser(null);
          setDeleteConfirmed(false);
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
                onClick={() => deleteHandler(user!)}
                disabled={!deleteConfirmed}
              />
              <CustomButton
                type="button"
                innerText={"No"}
                className="rounded p-2"
                actionType="cancel"
                onClick={() => setUser(null)}
              />
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
}
