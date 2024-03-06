import { GamesListSlider, SliderProps } from "./GamesListSlider";

export function DurationSlider(props: SliderProps) {
  const filterName = "Filter by duration?";
  const filterKey = "duration";

  const summariser = (range: [number, number]) => {
    const lower = Math.min(...range);
    const upper = Math.max(...range);

    const upperString = upper === 120 ? "120+ mins" : `${upper} mins`;

    if (lower < upper) {
      return `${lower} - ${upperString}`;
    } else {
      return upperString;
    }
  };

  return (
    <GamesListSlider
      {...props}
      filterKey={filterKey}
      filterName={filterName}
      summariser={summariser}
      step={5}
    />
  );
}
