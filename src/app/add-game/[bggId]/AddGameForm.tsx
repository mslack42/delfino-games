"use client";
import { CustomSubmitButton } from "@/components/input/CustomButton";
import { SelectOrNew } from "@/components/input/SelectOrNew";
import { DataSummaryKeyValuePair } from "@/components/data-display/DataSummaryKeyValuePair";
import { Ownership, Location } from "@prisma/client";

type AddGameFormProps = {
  holders: { id: number; name: string }[];
  action: (formData: FormData) => Promise<void>;
  className?: string;
};
export function AddGameForm(props: AddGameFormProps) {
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
            <select name="location">
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
              selectListValues={props.holders.map((h) => {
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

        <CustomSubmitButton innerText="Save" />
      </form>
    </>
  );
}
