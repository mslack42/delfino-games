import { InventoryItem } from "@/database/types";
import { useContext, useState } from "react";
import { FilterBubbleData } from "../../input/FilterBubbleBucket";
import { BubbleFilterInput } from "./controls/BubbleFilterInput";
import { FilterState } from "./types";
import { filterData } from "./util/filterData";
import { PlayerCountSlider } from "./controls/PlayerCountSlider";
import { DurationSlider } from "./controls/DurationSlider";
import { GameTextFilter } from "./controls/GameTextFilter";
import { LeftSheet } from "@/components/common/LeftSheet";
import { BooleanFilter } from "./controls/BooleanFilter";
import { initialFilterState } from "./util/initialFilterState";
import { extractOffices } from "./util/extractOffices";
import { extractDurationRange } from "./util/extractDurationRange";
import { extractPlayerCountRange } from "./util/extractPlayerCountRange";
import { extractTags } from "./util/extractTags";
import { extractHolders } from "./util/extractHolders";
import { GamesListContext } from "../GamesListContext";
import { GamesFilterContext } from "./GamesFilterContext";
import { BubbleAccordion } from "@/components/common/Accordion";

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

  const [testBool, setTestBool] = useState(false);

  return (
    <GamesFilterContext.Provider value={{ filterState, setFilterState }}>
      <LeftSheet
        head={
          <h2 className="text-xl rounded border-2 border-black p-1">
            Filters...
          </h2>
        }
        content={
          <div className="border border-black overflow-y-auto h-full p-2">
            <h2 className="text-2xl">Filters</h2>
            <div className="flex flex-wrap justify-center">
              {controlsKeys.includes("office") && offices.length > 1 && (
                <BubbleFilterInput
                  filterName="Filter by office?"
                  filterKey="office"
                  allOptions={offices}
                />
              )}
              {controlsKeys.includes("holders") && holders.length > 1 && (
                <BubbleFilterInput
                  filterName="Filter by game holder?"
                  filterKey="holders"
                  allOptions={holders}
                />
              )}
              {controlsKeys.includes("inrotation") && (
                <BooleanFilter
                  filterName="Show only available games?"
                  filterKey="inrotation"
                />
              )}
              {controlsKeys.includes("tags") && (
                <BubbleFilterInput
                  filterName="Filter by BGG tags?"
                  filterKey="tags"
                  allOptions={tags}
                />
              )}
              {controlsKeys.includes("playercount") && (
                <PlayerCountSlider
                  range={playerCountRange as [number, number]}
                />
              )}
              {controlsKeys.includes("duration") && (
                <DurationSlider range={durationRange as [number, number]} />
              )}
              {controlsKeys.includes("name") && <GameTextFilter />}
              <BubbleAccordion
                items={[
                  {
                    head: "Office",
                    body: (
                      <BubbleFilterInput
                        filterName="Filter by office?"
                        filterKey="office"
                        allOptions={offices}
                      />
                    ),
                    open:
                      filterState.bubbleTypeFilters["office"]?.filterOn ??
                      false,
                    setOpen: (b: boolean) => {
                      console.log("setopen");
                      setFilterState({
                        ...filterState,
                        bubbleTypeFilters: {
                          ...filterState.bubbleTypeFilters,
                          office: {
                            ...filterState.bubbleTypeFilters.office,
                            filterOn: b,
                          },
                        },
                      });
                    },
                  },
                  {
                    head: "Game Holder",
                    body: <div>test</div>,
                    open: testBool,
                    setOpen: (b: boolean) => {
                      setTestBool(b);
                    },
                  },
                  {
                    head: "BGG Tags",
                    body: <div>test</div>,
                    open: testBool,
                    setOpen: (b: boolean) => {
                      setTestBool(b);
                    },
                  },
                  {
                    head: "Number Of Players",
                    body: <div>test</div>,
                    open: testBool,
                    setOpen: (b: boolean) => {
                      setTestBool(b);
                    },
                  },
                  {
                    head: "Duration",
                    body: <div>test</div>,
                    open: testBool,
                    setOpen: (b: boolean) => {
                      setTestBool(b);
                    },
                  },
                  {
                    head: "Search",
                    body: <div>test</div>,
                    open: testBool,
                    setOpen: (b: boolean) => {
                      setTestBool(b);
                    },
                  },
                ]}
              />
            </div>
          </div>
        }
      />
    </GamesFilterContext.Provider>
  );
}
