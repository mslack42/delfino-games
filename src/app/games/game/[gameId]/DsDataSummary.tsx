import { DataSummaryKeyValuePair } from "@/components/data-display/DataSummaryKeyValuePair";
import { Ownership } from "@prisma/client";

type DsSummaryData = {
  holder: string;
  owner: string;
  location: string;
  inRotation: boolean;
  ownership: Ownership;
};
type DsDataSummaryProps = {
  data: DsSummaryData;
  fullDetails?: boolean;
};
export function DsDataSummary(props: DsDataSummaryProps) {
  return (
    <div>
      <h1 className="text-xl">
        <b>This copy:</b>
      </h1>
      <div className="flex justify-center items-center text-center flex-col ">
        <DataSummaryKeyValuePair
          dataKey={"Ownership"}
          dataValue={props.data.ownership}
        />
        <DataSummaryKeyValuePair
          dataKey={"Location"}
          dataValue={props.data.location}
        />
        {props.fullDetails ? (
          <>
            <DataSummaryKeyValuePair
              dataKey={"Owned by"}
              dataValue={props.data.owner}
            />
            <DataSummaryKeyValuePair
              dataKey={"Held by"}
              dataValue={props.data.holder}
            />
          </>
        ) : undefined}
        <DataSummaryKeyValuePair
          dataKey={"Currently in rotation?"}
          dataValue={props.data.inRotation ? "Yes" : "No"}
        />
      </div>
    </div>
  );
}
