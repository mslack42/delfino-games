"use client";
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";
import { useState } from "react";
import { UserModalProps, UserType } from "./UserTable";
import { useRouter } from "next/navigation";
import { ApiRoutes } from "@/constants/routes";

export function DeleteUserModal({ user, setUser }: UserModalProps) {
  const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);
  const router = useRouter();

  const deleteHandler = async (user: UserType) => {
    if (user && deleteConfirmed) {
      await fetch(ApiRoutes.DeleteUser(user.id), { method: "DELETE" });
      setUser(null);
      setDeleteConfirmed(false);
      router.refresh();
    }
  };

  return (
    <>
      <CustomModal
        isOpen={!!user}
        title={<b>Are you sure you want to delete {user?.name}?</b>}
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
        }
        onClose={() => {
          setUser(null);
          setDeleteConfirmed(false);
        }}
      ></CustomModal>
    </>
  );
}
