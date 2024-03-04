import { GamesListSlider, SliderProps } from "./GamesListSlider";

export function PlayerCountSlider(props: SliderProps) {
  const filterName = "Player Count";
  const filterKey = "playercount";

  const summariser = (range: [number, number]) => {
    const lower = Math.min(...range);
    const upper = Math.max(...range);

    const upperString = upper === 12 ? "12+" : `${upper}`;

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
      step={1}
    />
  );
}
