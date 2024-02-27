"use client";

import { MouseEventHandler } from "react";
import { twJoin } from "tailwind-merge";

type CustomSubmitButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  innerText: string;
  actionType?: "confirm" | "cancel";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
export function CustomButton(props: CustomSubmitButtonProps) {
  const actionType = props.actionType ?? "confirm";
  return (
    <button
      type={props.type}
      className={twJoin(
        props.className ?? "",
        actionType === "confirm" ? "bg-teal-300 hover:bg-teal-200" : "",
        actionType === "cancel" ? "bg-red-300 hover:bg-red-200" : ""
      )}
      onClick={props.onClick}
    >
      {props.innerText}
    </button>
  );
}
