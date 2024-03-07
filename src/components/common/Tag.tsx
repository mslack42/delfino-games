import React from "react";

type TagProps = {
  tag: string;
};
export function Tag(props: TagProps) {
  return <div className="bg-tag text-teal-900 p-1 rounded-lg">{props.tag}</div>;
}
