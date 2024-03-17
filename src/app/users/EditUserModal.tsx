"use client";
import { CustomModal } from "@/components/common/CustomModal";
import { UserEditForm } from "./UserEditForm";
import { useRouter } from "next/navigation";
import { Conditional } from "@/components/common/Conditional";
import { UserModalProps } from "./UserTable";

export function EditUserModal({ user, setUser }: UserModalProps) {
  const router = useRouter();

  const changeMade = () => {
    setUser(null);
    router.refresh();
  };
  return (
    <>
      <CustomModal
        isOpen={!!user}
        title={<b>Edit {user?.name}</b>}
        onClose={() => {
          setUser(null);
        }}
      >
        <Conditional when={!!user}>
          <UserEditForm user={user!} onSubmitComplete={changeMade} />
        </Conditional>
      </CustomModal>
    </>
  );
}
