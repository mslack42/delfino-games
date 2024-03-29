"use client";
import { CustomModal } from "@/components/common/CustomModal";
import { Person } from "@prisma/client";
import { useRouter } from "next/navigation";
import { EditHolderForm } from "./EditHolderForm";
import { Conditional } from "@/components/common/Conditional";

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
        onClose={() => onClose()}
      >
        <Conditional when={!!holder}>
          <EditHolderForm holder={holder!} onSubmitComplete={changeMade} />
        </Conditional>
      </CustomModal>
    </>
  );
}
