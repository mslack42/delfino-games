"use client";
import { useState } from "react";

type SelectListPair = {
  value: string;
  display: string;
};

type Props = {
  selectListValues: SelectListPair[];
  newValueString: string;
  selectParamName: string;
  textParamName: string;
};

export function SelectOrNew(props: Props) {
  const { selectListValues, newValueString, selectParamName, textParamName } =
    props;
  const defaultValue = selectListValues.length
    ? selectListValues[0].value
    : "-1";
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  return (
    <>
      <select
        value={selectedValue}
        name={selectParamName}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        {selectListValues.map((kvp) => (
          <option value={kvp.value} key={kvp.value}>
            {kvp.display}
          </option>
        ))}
        <option value={-1}>{newValueString}</option>
      </select>
      {selectedValue !== "-1" ? undefined : (
        <input type="text" name={textParamName}></input>
      )}
    </>
  );
}
