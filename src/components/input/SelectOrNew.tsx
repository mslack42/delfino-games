"use client";
import { useEffect, useMemo, useState } from "react";

type SelectListPair = {
  value: string;
  display: string;
};

type Props = {
  selectListValues: SelectListPair[];
  newValueString: string;
  selectProps: any & { name: string };
  textProps: any & { name: string; placeholder: string };
  className?: string;
};

export function SelectOrNew(props: Props) {
  const {
    selectListValues,
    selectProps,
    textProps,
    className,
    newValueString,
  } = props;
  const defaultValue = useMemo(
    () => (selectListValues.length ? selectListValues[0].value : "-2"),
    [selectListValues]
  );
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    if (!["-1","-2"].includes(selectedValue) && props.selectListValues.every((v) => v.value !== selectedValue)) {
      setSelectedValue(() => "-2");
    }
  }, [props.selectListValues, selectedValue]);

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
        {selectListValues.map((kvp) => (
          <option value={kvp.value} key={kvp.value}>
            {kvp.display}
          </option>
        ))}
        <option value={'-1'}>{newValueString}</option>
      </select>
      {selectedValue !== "-1" ? undefined : (
        <input {...defaultTextProps} {...textProps}></input>
      )}
    </div>
  );
}
