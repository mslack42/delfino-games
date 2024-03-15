"use client";
import React, { useState } from "react";
import { twJoin } from "tailwind-merge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/ShadcnDropDown";
import { Conditional } from "../common/Conditional";

export type DropDownGroup = {
  head: React.ReactNode;
  items: React.ReactNode[];
};
export type DropDownGroupCollection = {
  [key: string]: DropDownGroup;
};

type DropDownProps = {
  head: React.ReactNode;
  className?: string;
  name: string;
} & (
  | {
      type: "Single";
      items: React.ReactNode[];
    }
  | {
      type: "Multi";
      items: DropDownGroup[];
    }
);
export function DropDown(props: DropDownProps) {
  const [open, setOpen] = useState(false);

  const content =
    props.type === "Single" ? (
      <>
        {props.items.map((it, i) => (
          <DropdownMenuItem
            key={i}
            className={twJoin([
              "z-[1002] cursor-pointer rounded-lg last:border-b-0 px-2 focus:outline-none",
              "focus:bg-teal-500 focus:text-white",
            ])}
            onPointerDown={() => setOpen(false)}
          >
            {it}
          </DropdownMenuItem>
        ))}
      </>
    ) : (
      <>
        {props.items.map((it, i) => (
          <span key={i}>
            <DropdownMenuLabel
              className="bg-teal-500 rounded-lg"
              onPointerDown={(evt) => evt.stopPropagation()}
            >
              {it.head}
            </DropdownMenuLabel>
            {it.items.map((sub, j) => {
              return (
                <DropdownMenuItem
                  key={j}
                  className={twJoin([
                    "z-[1002] cursor-pointer rounded-lg last:border-b-0 px-2 focus:outline-none",
                    "focus:bg-teal-400 focus:text-white",
                  ])}
                  onPointerDown={() => setOpen(false)}
                >
                  {sub}
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator
              onPointerDown={(evt) => evt.stopPropagation()}
            />
          </span>
        ))}
      </>
    );

  return (
    <>
      <Conditional when={props.items.length === 0}>{props.head}</Conditional>
      <Conditional when={props.items.length > 0}>
        <DropdownMenu open={open}>
          <DropdownMenuTrigger
            onPointerDown={() => setOpen(true)}
            name={props.name}
            aria-label={props.name}
          >
            {props.head}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="z-[1001] bg-teal-200"
            onPointerDownOutside={() => setOpen(false)}
            onFocusOutside={() => setOpen(false)}
            onInteractOutside={() => setOpen(false)}
            align="end"
            avoidCollisions={true}
          >
            {content}
          </DropdownMenuContent>
        </DropdownMenu>
      </Conditional>
    </>
  );
}
