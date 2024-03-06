type DataRowProps = {
  keyPart: React.ReactNode | string;
  valuePart: React.ReactNode | string;
};
export function GameCardDataRow(props: DataRowProps) {
  return (
    <div className="flex flex-row text-left justify-start flex-wrap space-x-2 w-full pl-2">
      <div>{props.keyPart}</div>
      <div>{props.valuePart}</div>
    </div>
  );
}
