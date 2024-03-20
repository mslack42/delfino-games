import React from "react";

export function ScrollBox(props: React.PropsWithChildren<{}>) {
  return (
    <div className="max-h-36 w-full text-left overflow-hidden hover:overflow-y-scroll pl-4 pr-4 bg-cardScroller rounded-lg break-words ">
      {props.children}
    </div>
  );
}
