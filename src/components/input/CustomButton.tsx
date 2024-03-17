"use client";

import { PointerEventHandler } from "react";
import { twJoin } from "tailwind-merge";

type CommonProps = {
  innerText: string;
  actionType?: "confirm" | "cancel";
  className?: string;
  disabled?: boolean;
};
type ButtonProps = CommonProps & {
  type: "button" | "submit" | "reset";
  form?: string;
  onClick?: PointerEventHandler<HTMLButtonElement>;
};
type UnbuttonProps = CommonProps & {
  type: "notabutton";
  onClick?: PointerEventHandler<HTMLDivElement>;
};
type Props = ButtonProps | UnbuttonProps;

// Handle when this button needs to not be a button because hydration
// Namely, when the button is a hyperlink
export function CustomButton(props: Props) {
  const actionType = props.actionType ?? "confirm";
  return (
    <>
      {props.type !== "notabutton" ? (
        <button
          type={props.type}
          className={twJoin(
            props.className ?? "",
            actionType === "confirm" && !props.disabled
              ? "bg-teal-600 hover:bg-teal-500 text-white"
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
      ) : (
        <div
          onClick={!props.disabled && props.onClick ? props.onClick : undefined}
          className={twJoin(
            props.className ?? "",
            actionType === "confirm" && !props.disabled
              ? "bg-teal-600 hover:bg-teal-500 text-white"
              : "",
            actionType === "cancel" && !props.disabled
              ? "bg-red-300 hover:bg-red-200"
              : "",
            props.disabled ? "bg-slate-200" : ""
          )}
        >
          {props.innerText}
        </div>
      )}
    </>
  );
}
