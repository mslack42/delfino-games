import { MouseEventHandler } from "react";

type GameCardActionProps = {
  body: React.ReactNode | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
export function GameCardActionButton(props: GameCardActionProps) {
  return (
    <div className="bg-teal-400 p-1 rounded-lg text-xs">
      <button onClick={props.onClick}>{props.body}</button>
    </div>
  );
}
