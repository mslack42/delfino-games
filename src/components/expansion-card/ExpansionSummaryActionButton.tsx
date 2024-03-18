import { PropsWithChildren } from "react";

type ExpansionSummaryActionButtonProps = {
  ["aria-label"]?: string;
  onClick?: () => void;
};
export function ExpansionSummaryActionButton(
  props: PropsWithChildren<ExpansionSummaryActionButtonProps>
) {
  return (
    <div className="flex flex-row justify-end pointer-events-auto">
      <div className="relative bg-teal-400 rounded-lg text-sm  w-6 h-6">
        <button
          className="w-full h-full"
          aria-label={props["aria-label"]}
          onClick={props.onClick ?? undefined}
        >
          {props.children}
        </button>
      </div>
    </div>
  );
}
