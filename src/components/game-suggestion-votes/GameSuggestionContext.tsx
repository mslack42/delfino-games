import { Dispatch, SetStateAction, createContext } from "react";

export type GameSuggestionVote = {
  user: {
    id: string;
    name: string;
  };
  bggGameId: number;
};

export type GameSuggestionVotesContextType = {
  allVotes: GameSuggestionVote[];
  setAllVotes: Dispatch<SetStateAction<GameSuggestionVote[]>>;
};

export const GameSuggestionVotesContext =
  createContext<GameSuggestionVotesContextType>({
    allVotes: [],
    setAllVotes: function (_: SetStateAction<GameSuggestionVote[]>): void {},
  });
