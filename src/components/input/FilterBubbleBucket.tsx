export type FilterBubbleData = {
  name: string;
  data: number | string;
};
type FilterBubbleBucketProps = {
  allValues: FilterBubbleData[];
  selectedValues: (number | string)[];
  enabled: boolean;
  toggleFn: (toggledValue: any) => void;
};
export function FilterBubbleBucket(props: FilterBubbleBucketProps) {
  return (
    <div>
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
  );
}

type FilterBubbleProps = {
  name: string;
  inputEnabled: boolean;
  isActive: boolean;
  onToggle: () => void;
};
function FilterBubble(props: FilterBubbleProps) {
  const enableDisableStyling = props.inputEnabled && props.isActive ?
   "bg-pink-300 hover:bg-pink-200" : "bg-slate-400 hover:bg-slate-300";
  return (
    <div
      className={"rounded-lg flex flex-row w-fit px-2 cursor-pointer" + " " + enableDisableStyling}
      onClick={props.inputEnabled ? props.onToggle : undefined}
    >
      <div>{props.name}</div>
    </div>
  );
}
