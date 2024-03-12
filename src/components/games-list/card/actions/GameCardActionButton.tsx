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
      <div className="flex flex-row justify-end">
        <div className="relative bg-teal-400 p-1 rounded-lg text-xs md:text-sm">
          <button onClick={props.onClick}>{props.body}</button>
          {true ? (
            props.hatReveal ? (
              <CustomPopover head={hat} content={props.hatReveal} />
            ) : (
              hat
            )
          ) : undefined}
        </div>
      </div>
    </>
  );
}
