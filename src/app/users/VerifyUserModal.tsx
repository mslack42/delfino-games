"use client";
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";
import { UserModalProps, UserType } from "./UserTable";
import { useRouter } from "next/navigation";

export function VerifyUserModal({ user, setUser }: UserModalProps) {
  const router = useRouter();
  const verifyHandler = async (user:UserType) => {
    if(user) {
      await fetch(`/api/user/verify?id=${user.id}`, {method:"POST"})
      setUser(null)
      router.refresh()
    }
  }

  return (
    <>
      <CustomModal
        isOpen={!!user}
        content={
          <div>
            <b>{`Verify ${user?.name}'s account?`}</b>
            <div className="flex flex-row justify-end w-full space-x-2">
              <CustomButton
                type="button"
                innerText={"Yes"}
                className="rounded p-2"
                onClick={() => verifyHandler(user!)}
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
        }
        onClose={() => {
          setUser(null);
        }}
      ></CustomModal>
    </>
  );
}
