import { InventoryItem } from "@/database/types";
import { useState } from "react";
import { dedupe } from "../../../util/dedupe";
import { FilterBubbleData } from "../../input/FilterBubbleBucket";
import { BubbleFilterInput } from "../../input/BubbleFilterInput";
import { FilterState, ControlsKey } from "../types";
import { filterData } from "../utils/filterData";
import { sortBubbleData } from "../utils/sortBubbleData";
import { PlayerCountSlider } from "../controls/PlayerCountSlider";
import { DurationSlider } from "../controls/DurationSlider";
import { GameTextFilter } from "../controls/GameTextFilter";
import { LeftSheet } from "@/components/common/LeftSheet";

const initialFilterState: FilterState = {
  bubbleTypeFilters: {
    office: {
      filterOn: false,
      values: [],
    },
    holders: {
      filterOn: false,
      values: [],
    },
    tags: {
      filterOn: false,
      values: [],
    },
  },
  sliderTypeFilters: {
    playercount: {
      filterOn: false,
      lower: 1,
      upper: 12,
    },
    duration: {
      filterOn: false,
      lower: 5,
      upper: 120,
    },
  },
  textTypeFilters: {
    name: {
      filterOn: false,
      text: "",
    },
  },
};

type Props = {
  gamesList: InventoryItem[];
  onFilterChange: (filteredList: InventoryItem[]) => void;
  controlsKeys: ControlsKey[];
};
export function GamesListFilterControls(props: Props) {
  const onFilterChange = props.onFilterChange;
  const gamesList = props.gamesList;

  const offices: FilterBubbleData[] = sortBubbleData(
    dedupe(gamesList.map((g) => g.dsData.location)).map((d) => {
      return {
        name: d,
        data: d,
      };
    })
  );
  const holders: FilterBubbleData[] = sortBubbleData(
    dedupe(gamesList.map((g) => g.dsData.holder)).map((d) => {
      return {
        name: d,
        data: d,
      };
    })
  );
  const tags: FilterBubbleData[] = sortBubbleData(
    dedupe(gamesList.map((g) => g.bggData.specs.tags).flat()).map((d) => {
      return {
        name: d,
        data: d,
      };
    })
  );
  const playerCountRange: number[] = gamesList
    .map((g) => {
      return [g.bggData.specs.minPlayerCount, g.bggData.specs.maxPlayerCount];
    })
    .reduce(
      (a, b) => {
        const vals = a.concat(b).filter((v) => v) as number[];
        return [Math.min(...vals), Math.min(Math.max(...vals), 12)];
      },
      [null, null]
    ) as number[];
  const durationRange: number[] = gamesList
    .map((g) => {
      return [g.bggData.specs.minPlayTime, g.bggData.specs.maxPlayTime];
    })
    .reduce(
      (a, b) => {
        const vals = a.concat(b).filter((v) => v) as number[];
        return [Math.min(...vals), Math.min(Math.max(...vals), 120)];
      },
      [null, null]
    ) as number[];

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
    _setFilterState(newState),
      onFilterChange(filterData(newState, props.controlsKeys)(gamesList));
  };

  return (
    <LeftSheet
      head={<h2 className="text-xl">Filters...</h2>}
      content={
        <div className="border border-black">
          {props.controlsKeys.includes("office") && (
            <BubbleFilterInput
              filterName="Office"
              filterState={filterState}
              setFilterState={setFilterState}
              filterKey="office"
              allOptions={offices}
            />
          )}
          {props.controlsKeys.includes("holders") && (
            <BubbleFilterInput
              filterName="Holders"
              filterState={filterState}
              setFilterState={setFilterState}
              filterKey="holders"
              allOptions={holders}
            />
          )}
          {props.controlsKeys.includes("tags") && (
            <BubbleFilterInput
              filterName="Tags"
              filterState={filterState}
              setFilterState={setFilterState}
              filterKey="tags"
              allOptions={tags}
            />
          )}
          {props.controlsKeys.includes("playercount") && (
            <PlayerCountSlider
              filterState={filterState}
              setFilterState={setFilterState}
              range={playerCountRange as [number, number]}
            />
          )}
          {props.controlsKeys.includes("duration") && (
            <DurationSlider
              filterState={filterState}
              setFilterState={setFilterState}
              range={durationRange as [number, number]}
            />
          )}
          {props.controlsKeys.includes("name") && (
            <GameTextFilter
              filterState={filterState}
              setFilterState={setFilterState}
            />
          )}
        </div>
      }
    />
  );
}
