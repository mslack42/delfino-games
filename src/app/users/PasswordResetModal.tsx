"use client";
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";
import { UserModalProps, UserType } from "./UserTable";
import { useRouter } from "next/navigation";

export function PasswordResetModal({ user, setUser }: UserModalProps) {
  const router = useRouter();
  const passwordResetHandler = async (user:UserType) => {
    if(user) {
      await fetch(`/api/user/passwordReset?id=${user.id}`, {method:"POST"})
      setUser(null)
      router.refresh()
    }
  }
  return (
    <>
      <CustomModal
        isOpen={!!user}
        content={<div>
          <b>Are you sure you want to reset the password for {user?.name}?</b>
          <div className="flex flex-row justify-end w-full space-x-2">
            <CustomButton
              type="button"
              innerText={"Yes"}
              className="rounded p-2"
              onClick={() => passwordResetHandler(user!)} />
            <CustomButton
              type="button"
              innerText={"No"}
              className="rounded p-2"
              actionType="cancel"
              onClick={() => setUser(null)} />
          </div>
        </div>}
        onClose={() => {
          setUser(null);
        }}
      ></CustomModal>
    </>
  );
}
