"use client";
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";
import { UserModalProps, UserType } from "./UserTable";
import { useRouter } from "next/navigation";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { useToast } from "@/components/shadcn/use-toast";

export function PasswordResetModal({ user, setUser }: UserModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const passwordResetHandler = async (user: UserType) => {
    if (user) {
      try {
        const res = await fetch(ApiRoutes.ResetUserPassword(user.id), {
          method: "POST",
        });
        if (!res.ok) {
          if (res.status === 500) {
            toast({
              title: "Failed to reset password - internal failure",
              type: "background",
              variant: "destructive",
            });
          }
          if (res.status === 400 || res.status === 404) {
            toast({
              title: "Failed to reset password - validation failed",
              type: "background",
              variant: "destructive",
            });
          }
          return;
        }
        setUser(null);
        toast({
          title: "Password reset successfully",
        });
        router.refresh();
      } catch (e) {
        toast({
          title: "Failed to reset password",
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
        title={
          <b>Are you sure you want to reset the password for {user?.name}?</b>
        }
        onClose={() => {
          setUser(null);
        }}
      >
        <div>
          <div className="flex flex-row justify-end w-full space-x-2">
            <CustomButton
              type="button"
              innerText={"Yes"}
              className="rounded p-2"
              onClick={() => passwordResetHandler(user!)}
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
      </CustomModal>
    </>
  );
}
