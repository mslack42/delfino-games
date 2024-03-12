import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../shadcn/ShadcnPopover";

type Props = {
  head: string | React.ReactNode;
  content: string | React.ReactNode;
};

export function CustomPopover(props: Props) {
  return (
    <>
      <Popover>
        <PopoverTrigger>{props.head}</PopoverTrigger>
        <PopoverContent>{props.content}</PopoverContent>
      </Popover>
    </>
  );
}
