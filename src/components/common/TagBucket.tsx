import React from "react";
import { Tag } from "./Tag";

type TagBucketProps = {
  tags: string[];
};
export function TagBucket(props: TagBucketProps) {
  return (
    <div className="flex flex-wrap text-left justify-items-start justify-start gap-2 text-sm pt-2 pb-2">
      {props.tags.map((t) => (
        <Tag tag={t} key={t}></Tag>
      ))}
    </div>
  );
}
