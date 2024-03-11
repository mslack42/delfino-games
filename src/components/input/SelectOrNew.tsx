"use client";
import { useEffect, useMemo, useState } from "react";

type SelectListPair = {
  value: string;
  display: string;
};

type Props = {
  selectListValues: (SelectListPair | undefined)[];
  newValueString: string;
  selectProps: any & { name: string };
  textProps: any & { name: string; placeholder: string };
  className?: string;
  value?: string;
};

export function SelectOrNew(props: Props) {
  const {
    selectListValues,
    selectProps,
    textProps,
    className,
    newValueString,
    value,
  } = props;
  const realSelectValues: SelectListPair[] = useMemo(
    () => selectListValues.filter((v) => v !== undefined).map((v) => v!),
    [selectListValues]
  );
  const defaultValue = useMemo(
    () =>
      realSelectValues.length &&
      value &&
      realSelectValues.map((rsv) => rsv.value).includes(value!)
        ? value
        : "-2",
    [realSelectValues, value]
  );
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    if (
      !["-1", "-2"].includes(selectedValue) &&
      realSelectValues.every((v) => v.value !== selectedValue)
    ) {
      setSelectedValue(() => "-2");
    }
  }, [realSelectValues, selectedValue]);

  const defaultTextProps = {
    type: "text",
    className: "w-auto min-w-0",
    minLength: 1,
    maxLength: 100,
  };

  return (
    <div className={className}>
      <select
        {...selectProps}
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e.target.value);
        }}
      >
        {realSelectValues.map((kvp) => (
          <option value={kvp.value} key={kvp.value}>
            {kvp.display}
          </option>
        ))}
        <option value={"-1"}>{newValueString}</option>
      </select>
      {selectedValue !== "-1" ? undefined : (
        <input {...defaultTextProps} {...textProps}></input>
      )}
    </div>
  );
}
