
import { useMemo, useState } from "react";
import { Slider } from "./ShadcnSlider";

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
  const [lower, setLower] = useState(min);
  const [upper, setUpper] = useState(max);
  const summary = props.summariser([lower, upper]);

  const calculatedDefaultRange = useMemo(() => [
    Math.max(min,props.defaultRange[0]),
    Math.min(max,props.defaultRange[1])
  ],[props.defaultRange])
  return (
    <>
      <div className="flex px-4 space-x-2 w-60">
        <Slider
          min={min}
          max={max}
          step={props.step ?? 1}
          minStepsBetweenThumbs={0}
          defaultValue={calculatedDefaultRange}
          onValueChange={onSliderChange}
          className="w-52 py-2"
        ></Slider>
        <div className="w-16">{summary}</div>
      </div>
    </>
  );
}
