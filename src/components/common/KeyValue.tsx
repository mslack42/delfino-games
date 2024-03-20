type KeyValueProps = {
  dataKey: string | React.ReactNode;
  dataValue: string | React.ReactNode;
  className?: string;
};
export function KeyValue(props: KeyValueProps) {
  return (
    <div className={props.className}>
      <div className="max-w-full">
        <b>{props.dataKey}:</b>
      </div>
      <div className="max-w-full">{props.dataValue}</div>
    </div>
  );
}
