import React from "react";

type TagProps = {
  tag: string;
};
export function Tag(props: TagProps) {
  return <div className="bg-indigo-300 p-1 rounded-lg">{props.tag}</div>;
}
