import { InventoryItem } from "@/database/types";
import { useContext, useMemo, useState } from "react";
import { FilterBubbleData } from "../../input/FilterBubbleBucket";
import { BubbleFilterInput } from "./controls/BubbleFilterInput";
import { ControlsKey, FilterState, FilterType } from "./types";
import { filterData } from "./util/filterData";
import { PlayerCountSlider } from "./controls/PlayerCountSlider";
import { DurationSlider } from "./controls/DurationSlider";
import { GameTextFilter } from "./controls/GameTextFilter";
import { LeftSheet } from "@/components/common/LeftSheet";
import { initialFilterState } from "./util/initialFilterState";
import { extractOffices } from "./util/extractOffices";
import { extractDurationRange } from "./util/extractDurationRange";
import { extractPlayerCountRange } from "./util/extractPlayerCountRange";
import { extractTags } from "./util/extractTags";
import { extractHolders } from "./util/extractHolders";
import { GamesListContext } from "../GamesListContext";
import { GamesFilterContext } from "./GamesFilterContext";
import {
  AccordionItem,
  BubbleAccordion,
} from "@/components/games-list/filter/controls/BubbleAccordion";

export function GamesListFilterControls() {
  const { inventoryData, controlsKeys, setFilterMethod } =
    useContext(GamesListContext);

  const offices: FilterBubbleData[] = extractOffices(inventoryData);
  const holders: FilterBubbleData[] = extractHolders(inventoryData);
  const tags: FilterBubbleData[] = extractTags(inventoryData);
  const playerCountRange: number[] = extractPlayerCountRange(inventoryData);
  const durationRange: number[] = extractDurationRange(inventoryData);

  const [filterState, _setFilterState] = useState<FilterState>({
    ...initialFilterState,
    bubbleTypeFilters: {
      ...initialFilterState.bubbleTypeFilters,
      office: {
        ...initialFilterState.bubbleTypeFilters.office,
        values: offices.map((o) => o.data as string),
      },
      holders: {
        ...initialFilterState.bubbleTypeFilters.holders,
        values: holders.map((o) => o.data as string),
      },
      tags: {
        ...initialFilterState.bubbleTypeFilters.tags,
        values: [],
      },
    },
  });
  const setFilterState = (newState: FilterState) => {
    _setFilterState(newState);
    setFilterMethod(() => (lst: InventoryItem[]) => {
      if (!!lst) {
        return filterData(newState, controlsKeys)(lst);
      } else {
        return lst;
      }
    });
  };

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
          allOptions={offices}
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
          allOptions={holders}
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
          allOptions={tags}
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
      body: <PlayerCountSlider range={playerCountRange as [number, number]} />,
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
      body: <DurationSlider range={durationRange as [number, number]} />,
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
  const appliedFilterCount = useMemo(() => {
    return Object.values(filterState)
      .map((v) => Object.values(v).filter((v) => v.filterOn).length)
      .reduce((a, b) => a + b, 0);
  }, [filterState]);

  return (
    <GamesFilterContext.Provider value={{ filterState, setFilterState }}>
      <LeftSheet
        head={
          <div className="relative">
            <h2 className="text-xl rounded p-1 border-2 border-black">
              Filters...
            </h2>
            {appliedFilterCount > 0 && (
              <div className="absolute -top-1 -right-2  px-1 rounded-full bg-teal-200 text-sm align-baseline text-teal-800">
                {appliedFilterCount}
              </div>
            )}
          </div>
        }
        content={
          <div className="h-full w-full overflow-y-auto">
            <h2 className="text-2xl">Filters</h2>
            <div className="flex flex-wrap justify-center w-full">
              <BubbleAccordion items={items} />
            </div>
          </div>
        }
      />
    </GamesFilterContext.Provider>
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
