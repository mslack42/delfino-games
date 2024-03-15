import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../shadcn/ShadcnPopover";

type Props = {
  head: string | React.ReactNode;
};

export function CustomPopover(props: React.PropsWithChildren<Props>) {
  return (
    <>
      <Popover>
        <PopoverTrigger>{props.head}</PopoverTrigger>
        <PopoverContent>{props.children}</PopoverContent>
      </Popover>
    </>
  );
}
