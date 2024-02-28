"use client";
import { CustomButton } from "@/components/input/CustomButton";
import { SelectOrNew } from "@/components/input/SelectOrNew";
import { DataSummaryKeyValuePair } from "@/components/data-display/DataSummaryKeyValuePair";
import { Ownership, Location } from "@prisma/client";
import { useMemo, useState } from "react";

type AddGameFormProps = {
  holders: { id: number; name: string; location: Location }[];
  action: (formData: FormData) => Promise<void>;
  className?: string;
};
export function AddGameForm(props: AddGameFormProps) {
  const [currLocation,setCurrLocation] = useState<Location>("Poole")
  const locationHolders = useMemo(() => props.holders.filter(h => h.location === currLocation),[props.holders,currLocation])

  return (
    <>
      <h1 className="text-2xl font-bold pt-2">Enter Details:</h1>
      <form className={"text-justify " + props.className} action={props.action}>
        <DataSummaryKeyValuePair
          dataKey="Ownership"
          dataValue={
            <select name="ownership">
              {Object.values(Ownership).map((own) => (
                <option value={own} key={own}>
                  {own}
                </option>
              ))}
            </select>
          }
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey="Location"
          dataValue={
            <select name="location" value={currLocation} onChange={(evt) => setCurrLocation(evt.currentTarget.value as Location)}>
              {Object.values(Location).map((loc) => (
                <option value={loc} key={loc}>
                  {loc}
                </option>
              ))}
            </select>
          }
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey="Holder"
          dataValue={
            <SelectOrNew
              selectListValues={locationHolders.map((h) => {
                return {
                  value: `${h.id}`,
                  display: h.name,
                };
              })}
              newValueString={"Add New..."}
              selectParamName={"holderId"}
              textParamName={"newHolder"}
              placeHolder="New Games Holder..."
              className="text-right grow flex-nowrap"
            ></SelectOrNew>
          }
        ></DataSummaryKeyValuePair>

        <CustomButton type="submit" innerText="Save" className="w-20" />
      </form>
    </>
  );
}
