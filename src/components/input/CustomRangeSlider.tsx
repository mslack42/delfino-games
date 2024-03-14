import { useEffect, useMemo, useState } from "react";
import { Slider } from "../shadcn/ShadcnSlider";
import { tryParseInt } from "@/util/tryParseInt";

type Props = {
  fullRange: [number, number];
  defaultRange: [number, number];
  summariser: (range: [number, number]) => string;
  onChange?: (range: number[]) => void;
  step?: number;
};
export function CustomRangeSlider(props: Props) {
  const min = useMemo(() => Math.min(...props.fullRange), [props.fullRange]);
  const max = useMemo(() => Math.max(...props.fullRange), [props.fullRange]);
  const onSliderChange = (value: number | number[]) => {
    const range = value as number[];
    setLower(Math.max(Math.min(...range), min));
    setUpper(Math.min(Math.max(...range), max));
    props.onChange ? props.onChange(range) : null;
  };
  const [lower, setLower] = useState(Math.max(props.defaultRange[0], min));
  const [upper, setUpper] = useState(Math.min(props.defaultRange[1], max));

  const summary = props.summariser([lower, upper]);

  const [textInputState, setTextInputState] = useState(summary);

  useEffect(() => {
    setTextInputState(props.summariser([lower, upper]));
  }, [lower, props, upper]);

  function trySetSlider(textInput: string) {
    const content = textInput.trim();
    const singleNumberRegex = new RegExp(`^\\d+$`);
    const rangeNumberRegex = new RegExp(`^(\\d+)\\s*\\-\\s*(\\d+)$`);

    if (singleNumberRegex.test(content)) {
      const range = [tryParseInt(content)!];
      onSliderChange(range);
      return;
    }

    if (rangeNumberRegex.test(content)) {
      const matches = content.match(rangeNumberRegex);
      const range = [tryParseInt(matches![1])!, tryParseInt(matches![2])!];
      onSliderChange(range);
      return;
    }

    onSliderChange([lower, upper]);
  }

  return (
    <>
      <div className="flex space-x-2 max-w-full w-full px-2">
        <Slider
          min={min}
          max={max}
          step={props.step ?? 1}
          minStepsBetweenThumbs={0}
          value={[lower, upper]}
          onValueChange={onSliderChange}
          className="py-2 w-4/5"
        ></Slider>

        <input
          className="w-2/5"
          type="text"
          value={textInputState}
          onChange={(evt) => setTextInputState(evt.currentTarget.value)}
          onFocus={() => setTextInputState(" ")}
          onBlur={(evt) => trySetSlider(evt.currentTarget.value)}
          onSubmit={(evt) => trySetSlider(evt.currentTarget.value)}
          onKeyDown={(evt) => {
            if (evt.key === "Enter") {
              evt.currentTarget.blur();
            }
          }}
        />
      </div>
    </>
  );
}
