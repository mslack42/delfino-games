import React from "react";
import { twMerge } from "tailwind-merge";

type TagProps = {
  tag: string | React.ReactNode;
  className?: string;
};
export function Tag(props: TagProps) {
  return (
    <div
      className={twMerge(
        "bg-tag text-teal-900 p-1 rounded-lg hover:bg-hovertag",
        props.className
      )}
    >
      {props.tag}
    </div>
  );
}
