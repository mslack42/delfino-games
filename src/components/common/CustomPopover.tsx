import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../shadcn/ShadcnPopover";

type Props = {
  head: string | React.ReactNode;
  name?: string;
};

export function CustomPopover(props: React.PropsWithChildren<Props>) {
  return (
    <>
      <Popover>
        <PopoverTrigger aria-label={props.name}>{props.head}</PopoverTrigger>
        <PopoverContent>{props.children}</PopoverContent>
      </Popover>
    </>
  );
}
