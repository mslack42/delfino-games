import { BggExpansionSummaryData } from "@/bgg/types";
import { Location } from "@prisma/client";
import { Dispatch, SetStateAction, createContext } from "react";

export type EditGameContextType = {
  expansions: BggExpansionSummaryData[];
  selectedExpansionBggIds: number[];
  setSelectedExpansionBggIds: Dispatch<SetStateAction<number[]>>;
  holders: { id: number; name: string; location: Location }[];
};

export const EditGameContext = createContext<EditGameContextType>({
  expansions: [],
  selectedExpansionBggIds: [],
  setSelectedExpansionBggIds: function (_: SetStateAction<number[]>): void {},
  holders: [],
});
