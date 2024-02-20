type KeyValueProps = {
  dataKey: string;
  dataValue: string | React.ReactNode;
  className?: string;
};
export function KeyValue(props: KeyValueProps) {
  return (
    <div className={props.className}>
      <div>
        <b>{props.dataKey}:</b>
      </div>
      <div> {props.dataValue}</div>
    </div>
  );
}
