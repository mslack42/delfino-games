import { twJoin } from "tailwind-merge";
import { KeyValue } from "../common/KeyValue";
import React from "react";

type DataSummaryKeyValueProps = {
  dataKey: string;
  dataValue: string | React.ReactNode;
  isMultiline?: boolean;
};
export function DataSummaryKeyValuePair(props: DataSummaryKeyValueProps) {
  return (
    <KeyValue
      dataKey={props.dataKey}
      dataValue={props.dataValue}
      className={twJoin(
        "flex flex-row justify-between w-4/5 ",
        props.isMultiline ? "flex-wrap" : ""
      )}
    ></KeyValue>
  );
}
