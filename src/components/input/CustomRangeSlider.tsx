import { Slider } from "@mui/base/Slider";
import { useState } from "react";

type Props = {
  fullRange: [number, number];
  defaultRange: [number, number];
  summariser: (range: [number, number]) => string;
  onChange?: (range: number[]) => void
};
export function CustomRangeSlider(props: Props) {
  const [lower, setLower] = useState(Math.min(...props.defaultRange));
  const [upper, setUpper] = useState(Math.max(...props.defaultRange));

  const summary = props.summariser([lower, upper]);

  const onSliderChange = (_:Event, value: number | number[], __: number) => {
    const range = value as number[]
    setLower(Math.min(...range))
    setUpper(Math.max(...range))
    props.onChange ? props.onChange(range) : null
  }

  return (
    <>
      <div className="flex px-4 space-x-2">
        <Slider
          min={Math.min(...props.fullRange)}
          max={Math.max(...props.fullRange)}
          defaultValue={props.defaultRange}
          onChange={onSliderChange}
          className="w-52 py-2"
          slotProps={{
            thumb: {
              className:
                "ring-cyan-500 dark:ring-cyan-400 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute",
            },
            root: {
              className: "w-full relative inline-block h-2 cursor-pointer",
            },
            rail: {
              className:
                "bg-slate-100 dark:bg-slate-700 h-2 w-full rounded-full block absolute",
            },
            track: {
              className:
                "bg-cyan-500 dark:bg-cyan-400 h-2 absolute rounded-full",
            },
          }}
        ></Slider>
        <div className="w-16">{summary}</div>
      </div>
    </>
  );
}
