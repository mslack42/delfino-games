import { twJoin } from "tailwind-merge";

export type FilterBubbleData = {
  name: string;
  data: string;
};
type FilterBubbleBucketProps = {
  allValues: FilterBubbleData[];
  selectedValues: string[];
  enabled: boolean;
  toggleFn: (toggledValue: any) => void;
  toggleAllFn?: (toggledValue: any) => void;
  scrollable?: boolean;
};
export function FilterBubbleBucket(props: FilterBubbleBucketProps) {
  return (
    <div className="max-h-40 m-w-full overflow-hidden hover:overflow-y-auto p-4">
      {props.allValues.length > 0 && props.toggleAllFn && (
        <>
          <div className="flex flex-row flex-wrap justify-around gap-1 pb-2">
            <>
              <FilterBubble
                name={"Select All"}
                inputEnabled={props.enabled}
                isActive={props.selectedValues.length >= props.allValues.length}
                onToggle={() => {
                  props.toggleAllFn!(true);
                }}
              />
              <FilterBubble
                name={"Select None"}
                inputEnabled={props.enabled}
                isActive={props.selectedValues.length == 0}
                onToggle={() => {
                  props.toggleAllFn!(false);
                }}
              />
            </>
          </div>
          <hr></hr>
        </>
      )}
      <div className="flex flex-row flex-wrap justify-around gap-1 pt-2">
        {props.allValues.map((v) => (
          <FilterBubble
            key={v.data}
            name={v.name}
            inputEnabled={props.enabled}
            isActive={props.selectedValues.includes(v.data)}
            onToggle={() => {
              props.toggleFn(v.data);
            }}
          ></FilterBubble>
        ))}
      </div>
    </div>
  );
}

type FilterBubbleProps = {
  name: string;
  inputEnabled: boolean;
  isActive: boolean;
  onToggle: () => void;
};
function FilterBubble(props: FilterBubbleProps) {
  const enableDisableStyling =
    props.inputEnabled && props.isActive
      ? "bg-teal-600 hover:bg-teal-500"
      : "bg-slate-400 hover:bg-slate-300";
  return (
    <div
      className={twJoin(
        "rounded-lg flex flex-row w-fit px-2 cursor-pointer",
        enableDisableStyling
      )}
      onClick={props.inputEnabled ? props.onToggle : undefined}
    >
      <div>{props.name}</div>
    </div>
  );
}
