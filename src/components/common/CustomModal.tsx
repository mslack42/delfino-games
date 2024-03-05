import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/ShadcnDialog";
import React from "react";

type CustomModalProps = {
  head?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
};
export function CustomModal(props: CustomModalProps) {
  return (
    <>
      <Dialog
        open={props.isOpen}
        onOpenChange={(isOpen) => {
          !isOpen ? props.onClose() : null;
        }}
      >
        {props.head ? <DialogTrigger>{props.head}</DialogTrigger> : undefined}
        <DialogContent className="bg-white z-[2000]">
          <DialogHeader>
            {props.title ? <DialogTitle>{props.title}</DialogTitle> : undefined}
            {props.subtitle ? (
              <DialogDescription>{props.subtitle}</DialogDescription>
            ) : undefined}
          </DialogHeader>
          {props.content}
          {props.footer ? (
            <DialogFooter>{props.footer}</DialogFooter>
          ) : undefined}
        </DialogContent>
      </Dialog>
    </>
  );
}
