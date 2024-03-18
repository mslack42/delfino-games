import { BggSummaryData } from "@/bgg/types";
import { Location } from "@prisma/client";
import { Dispatch, SetStateAction, createContext } from "react";

export type AddGameContextType = {
  bggData: BggSummaryData;
  selectedExpansionBggIds: number[];
  setSelectedExpansionBggIds: Dispatch<SetStateAction<number[]>>;
  holders: { id: number; name: string; location: Location }[];
};

export const AddGameContext = createContext<AddGameContextType>({
  bggData: {
    name: "defaultValues",
    bggId: 0,
    thumb: undefined,
    image: undefined,
    description: undefined,
    boardGameDataSpecs: {
      rank: undefined,
      score: undefined,
    },
    boardGameBggDataStats: {
      minplayers: undefined,
      maxplayers: undefined,
      minplaytime_minutes: undefined,
      maxplaytime_minutes: undefined,
      tags: [],
    },
  },
  selectedExpansionBggIds: [],
  setSelectedExpansionBggIds: function (_: SetStateAction<number[]>): void {},
  holders: [],
});
