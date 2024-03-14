import { useContext } from "react";
import { BubbleFilterInput } from "./controls/BubbleFilterInput";
import { ControlsKey, FilterState, FilterType } from "./types";
import { PlayerCountSlider } from "./controls/PlayerCountSlider";
import { DurationSlider } from "./controls/DurationSlider";
import { GameTextFilter } from "./controls/GameTextFilter";
import { GamesListContext } from "../GamesListContext";
import { GamesFilterContext } from "./GamesFilterContext";
import {
  AccordionItem,
  BubbleAccordion,
} from "@/components/games-list/filter/controls/BubbleAccordion";

export function FilterPanel() {
  const { filterState, setFilterState, dataLimits } =
    useContext(GamesFilterContext);
  const { controlsKeys } = useContext(GamesListContext);
  let items: AccordionItem[] = [
    {
      key: "inrotation",
      head: "Show only available games?",
      body: null,
      ...getAccordionOpeningMechanism(
        filterState,
        setFilterState,
        "booleanTypeFilters",
        "inrotation"
      ),
      trayless: true,
    },
    {
      key: "office",
      head: "Office",
      body: (
        <BubbleFilterInput
          filterName="Filter by office?"
          filterKey="office"
          allOptions={dataLimits.offices}
          noSelectAllNone
        />
      ),
      ...getAccordionOpeningMechanism(
        filterState,
        setFilterState,
        "bubbleTypeFilters",
        "office"
      ),
    },
    {
      key: "holders",
      head: "Game Holder",
      body: (
        <BubbleFilterInput
          filterName="Filter by game holder?"
          filterKey="holders"
          allOptions={dataLimits.holders}
        />
      ),
      ...getAccordionOpeningMechanism(
        filterState,
        setFilterState,
        "bubbleTypeFilters",
        "holders"
      ),
    },
    {
      key: "tags",
      head: "BGG Tags",
      body: (
        <BubbleFilterInput
          filterName="Filter by BGG tags?"
          filterKey="tags"
          allOptions={dataLimits.tags}
        />
      ),
      ...getAccordionOpeningMechanism(
        filterState,
        setFilterState,
        "bubbleTypeFilters",
        "tags"
      ),
    },
    {
      key: "playercount",
      head: "Number Of Players",
      body: (
        <PlayerCountSlider
          range={dataLimits.playerCountRange as [number, number]}
        />
      ),
      ...getAccordionOpeningMechanism(
        filterState,
        setFilterState,
        "sliderTypeFilters",
        "playercount"
      ),
    },
    {
      key: "duration",
      head: "Duration",
      body: (
        <DurationSlider range={dataLimits.durationRange as [number, number]} />
      ),
      ...getAccordionOpeningMechanism(
        filterState,
        setFilterState,
        "sliderTypeFilters",
        "duration"
      ),
    },
    {
      key: "name",
      head: "Search",
      body: <GameTextFilter />,
      ...getAccordionOpeningMechanism(
        filterState,
        setFilterState,
        "textTypeFilters",
        "name"
      ),
    },
  ];
  items = items.filter((it) => controlsKeys.includes(it.key));
  return (
    <>
      <h2 className="text-2xl">Filters</h2>
      <div className="flex flex-wrap justify-center w-full">
        <BubbleAccordion items={items} />
      </div>
    </>
  );
}
function getAccordionOpeningMechanism(
  filterState: FilterState,
  setFilterState: (newState: FilterState) => void,
  filterType: FilterType,
  filterKey: ControlsKey
): { open: boolean; setOpen: (b: boolean) => void } {
  return {
    open: filterState[filterType][filterKey]?.filterOn ?? false,
    setOpen: (b: boolean) => {
      setFilterState({
        ...filterState,
        [filterType]: {
          ...filterState[filterType],
          [filterKey]: {
            ...filterState[filterType][filterKey],
            filterOn: b,
          },
        },
      });
    },
  };
}
