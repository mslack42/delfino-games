import { useMemo, useState } from "react";
import { Slider } from "../shadcn/ShadcnSlider";

type Props = {
  fullRange: [number, number];
  defaultRange: [number, number];
  summariser: (range: [number, number]) => string;
  onChange?: (range: number[]) => void;
  step?: number;
};
export function CustomRangeSlider(props: Props) {
  const onSliderChange = (value: number | number[]) => {
    const range = value as number[];
    setLower(Math.min(...range));
    setUpper(Math.max(...range));
    props.onChange ? props.onChange(range) : null;
  };

  const min = useMemo(() => Math.min(...props.fullRange), [props.fullRange]);
  const max = useMemo(() => Math.max(...props.fullRange), [props.fullRange]);
  const [lower, setLower] = useState(Math.max(props.defaultRange[0], min));
  const [upper, setUpper] = useState(Math.min(props.defaultRange[1], max));

  const summary = props.summariser([lower, upper]);
  return (
    <>
      <div className="flex space-x-2 max-w-full w-full px-2">
        <Slider
          min={min}
          max={max}
          step={props.step ?? 1}
          minStepsBetweenThumbs={0}
          defaultValue={[lower, upper]}
          onValueChange={onSliderChange}
          className="py-2 w-4/5"
        ></Slider>
        <div className="w-2/5">{summary}</div>
      </div>
    </>
  );
}
