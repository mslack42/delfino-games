"use client";
import { CustomModal } from "@/components/common/CustomModal";
import { Person } from "@prisma/client";
import { useRouter } from "next/navigation";
import { EditHolderForm } from "./EditHolderForm";

type EditHolderProps = {
  holder: Person | null;
  onClose: () => void;
};
export function EditHolderModal(props: EditHolderProps) {
  const { holder, onClose } = props;
  const router = useRouter();

  const changeMade = () => {
    router.refresh();
    onClose();
  };

  return (
    <>
      <CustomModal
        isOpen={!!holder}
        title={<b>Edit {holder?.name}</b>}
        content={
          holder && (
            <EditHolderForm holder={holder} onSubmitComplete={changeMade} />
          )
        }
        onClose={() => onClose()}
      ></CustomModal>
    </>
  );
}
