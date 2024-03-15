import { InventoryItem } from "@/database/types";
import { FilterState } from "./types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { FilterBubbleData } from "@/components/input/FilterBubbleBucket";
import { extractHolders } from "./util/extractHolders";
import { extractOffices } from "./util/extractOffices";
import { extractTags } from "./util/extractTags";
import { extractPlayerCountRange } from "./util/extractPlayerCountRange";
import { extractDurationRange } from "./util/extractDurationRange";
import { filterData } from "./util/filterData";
import { GamesListContext } from "../GamesListContext";
import { initialFilterState } from "./util/initialFilterState";
import { useLocalStorageState } from "../../../util/useLocalStorageState";
import { getCachedFilterState } from "./util/getCachedFilterState";
import { GameRequestsContext } from "@/components/game-requests/GameRequestContext";

type FilterContext = {
  filterState: FilterState;
  setFilterState: (newState: FilterState) => void;
  dataLimits: {
    offices: FilterBubbleData[];
    holders: FilterBubbleData[];
    tags: FilterBubbleData[];
    playerCountRange: number[];
    durationRange: number[];
  };
  appliedFilterCount: number;
};
const defaultContext: FilterContext = {
  filterState: {
    bubbleTypeFilters: {},
    sliderTypeFilters: {},
    textTypeFilters: {},
    booleanTypeFilters: {
      inrotation: {
        filterOn: true,
      },
    },
  },
  setFilterState: (_: FilterState) => {},
  dataLimits: {
    offices: [],
    holders: [],
    tags: [],
    playerCountRange: [],
    durationRange: [],
  },
  appliedFilterCount: 0,
};
export const GamesFilterContext = createContext<FilterContext>(defaultContext);

type Props = {
  localStorageKey: string;
};
export function FilterContextProvider({
  localStorageKey,
  children,
}: PropsWithChildren<Props>) {
  const { inventoryData, controlsKeys, setFilterMethod, setFiltersReady } =
    useContext(GamesListContext);
  const { allRequests } = useContext(GameRequestsContext);
  const requestedGameIds = [...new Set(allRequests.map((r) => r.game.id))];
  const offices: FilterBubbleData[] = extractOffices(inventoryData);
  const holders: FilterBubbleData[] = extractHolders(inventoryData);
  const tags: FilterBubbleData[] = extractTags(inventoryData);
  const playerCountRange: number[] = extractPlayerCountRange(inventoryData);
  const durationRange: number[] = extractDurationRange(inventoryData);

  const fallback: FilterState = {
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
        values: tags.map((o) => o.data as string),
      },
    },
  };

  const [filterState, _setFilterState] = useLocalStorageState<FilterState>(
    localStorageKey,
    fallback,
    (a, b) => getCachedFilterState(a, b, controlsKeys)
  );
  const setFilterState = (newState: FilterState) => {
    _setFilterState(newState);
    setFilterMethod(() => (lst: InventoryItem[]) => {
      if (!!lst) {
        return filterData(newState, controlsKeys, requestedGameIds)(lst);
      } else {
        return lst;
      }
    });
  };
  const appliedFilterCount = useMemo(() => {
    return Object.values(filterState)
      .map((v) => Object.values(v).filter((v) => v.filterOn).length)
      .reduce((a, b) => a + b, 0);
  }, [filterState]);
  const context: FilterContext = {
    filterState,
    setFilterState,
    dataLimits: {
      offices,
      holders,
      tags,
      playerCountRange,
      durationRange,
    },
    appliedFilterCount,
  };

  useEffect(() => {
    setFilterState(filterState);
    setFiltersReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GamesFilterContext.Provider value={context}>
        {children}
      </GamesFilterContext.Provider>
    </>
  );
}
