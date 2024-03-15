import { CustomPopover } from "@/components/common/CustomPopover";
import { MouseEventHandler } from "react";

type GameCardActionProps = {
  hatCount?: number;
  hatReveal?: React.ReactNode;
  body: React.ReactNode | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
export function GameCardActionButton(props: GameCardActionProps) {
  const displayHat = props.hatCount && props.hatCount >= 0;
  const hatValue = displayHat
    ? props.hatCount! < 10
      ? props.hatCount!.toString()
      : "9+"
    : "";
  const hat = (
    <div className="absolute -top-1 -right-2  px-1 rounded-full bg-teal-200 text-xxs align-baseline text-teal-800">
      {hatValue}
    </div>
  );

  return (
    <>
      <div className="flex flex-row justify-end pointer-events-auto">
        <div className="relative bg-teal-400 rounded-lg text-sm  w-6 h-6">
          <button onClick={props.onClick} className="w-full h-full">
            {props.body}
          </button>
          {true ? (
            props.hatReveal ? (
              <CustomPopover head={hat}>{props.hatReveal}</CustomPopover>
            ) : (
              hat
            )
          ) : undefined}
        </div>
      </div>
    </>
  );
}
