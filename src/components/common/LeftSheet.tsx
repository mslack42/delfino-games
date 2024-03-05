import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../shadcn/ShadcnSheet";

type LeftSheetProps = {
  head?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  content: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
};

export function LeftSheet(props: LeftSheetProps) {
  return (
    <Sheet
      open={props.isOpen}
      onOpenChange={(isOpen) => {
        !isOpen && props.onClose ? props.onClose() : null;
      }}
    >
      {props.head ? <SheetTrigger>{props.head}</SheetTrigger> : undefined}
      <SheetContent side={"left"} className="bg-white">
        <SheetHeader>
          {props.title ? <SheetTitle>{props.title}</SheetTitle> : undefined}
          {props.subtitle ? (
            <SheetDescription>{props.subtitle}</SheetDescription>
          ) : undefined}
        </SheetHeader>
        {props.content}
        {props.footer ? <SheetFooter>{props.footer}</SheetFooter> : undefined}
      </SheetContent>
    </Sheet>
  );
}
