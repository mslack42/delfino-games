"use client";

import { PointerEventHandler } from "react";
import { twJoin } from "tailwind-merge";

type CustomSubmitButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  innerText: string;
  actionType?: "confirm" | "cancel";
  className?: string;
  disabled?: boolean;
  form?: string;
  onClick?: PointerEventHandler<HTMLButtonElement>;
};
export function CustomButton(props: CustomSubmitButtonProps) {
  const actionType = props.actionType ?? "confirm";
  return (
    <button
      type={props.type}
      className={twJoin(
        props.className ?? "",
        actionType === "confirm" && !props.disabled
          ? "bg-teal-300 hover:bg-teal-200"
          : "",
        actionType === "cancel" && !props.disabled
          ? "bg-red-300 hover:bg-red-200"
          : "",
        props.disabled ? "bg-slate-200" : ""
      )}
      form={props.form ?? undefined}
      disabled={props.disabled}
      onClick={props.onClick ?? undefined}
    >
      {props.innerText}
    </button>
  );
}
