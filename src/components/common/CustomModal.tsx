import { Modal } from "@mui/base/Modal";

type CustomModalProps = {
  isOpen: boolean;
  content: React.ReactNode;
  onClose: (evt: any) => void;
};
export function CustomModal(props: CustomModalProps) {
  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      className="fixed z-[1300] inset-0 flex align-middle justify-center"
      slotProps={{
        backdrop: {
        className:"z-[-1] fixed inset-0 bg-slate-400 opacity-50"
        },
      }}
      slots={{
        backdrop: 'div',
      }}
      hideBackdrop={false}
    >
      <div className="relative flex flex-col justify-center outline-none">
        <div className="rounded bg-white h-min p-5 z-[502]">{props.content}</div>        
      </div>
    </Modal>
  );
}
