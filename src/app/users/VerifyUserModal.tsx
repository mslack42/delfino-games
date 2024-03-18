"use client";
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";
import { UserModalProps, UserType } from "./UserTable";
import { useRouter } from "next/navigation";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { useToast } from "@/components/shadcn/use-toast";

export function VerifyUserModal({ user, setUser }: UserModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const verifyHandler = async (user: UserType) => {
    if (user) {
      try {
        const res = await fetch(ApiRoutes.VerifyUser(user.id), {
          method: "POST",
        });

        if (!res.ok) {
          if (res.status === 500) {
            toast({
              title: "Failed to verify user - internal failure",
              type: "background",
              variant: "destructive",
            });
          }
          if (res.status === 400 || res.status === 404) {
            toast({
              title: "Failed to verify user - validation failure",
              type: "background",
              variant: "destructive",
            });
          }
          return;
        }
        setUser(null);
        toast({
          title: "User verified",
        });
        router.refresh();
      } catch (e) {
        toast({
          title: "Failed to verify user",
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
        title={<b>{`Verify ${user?.name}'s account?`}</b>}
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
      </CustomModal>
    </>
  );
}
