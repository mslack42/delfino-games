import React from "react";

type ScrollBoxProps = {
  content: React.ReactNode;
};
export function ScrollBox(props: ScrollBoxProps) {
  return (
    <div className="max-h-36 min-w-full text-left overflow-hidden hover:overflow-y-scroll pl-4 pr-4 bg-teal-300 rounded-lg ">
      {props.content}
    </div>
  );
}
