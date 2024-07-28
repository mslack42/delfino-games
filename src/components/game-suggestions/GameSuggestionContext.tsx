import { BggSearchResult } from "@/bgg/types";
import { Dispatch, SetStateAction, createContext } from "react";

export type GameSuggestion = {
  user: {
    id: string;
    name: string;
  };
  game: BggSearchResult;
};

export type GameSuggestionsContextType = {
  allSuggestions: GameSuggestion[];
  setAllSuggestions: Dispatch<SetStateAction<GameSuggestion[]>>;
};

export const GameSuggestionsContext = createContext<GameSuggestionsContextType>(
  {
    allSuggestions: [],
    setAllSuggestions: function (_: SetStateAction<GameSuggestion[]>): void {},
  }
);
