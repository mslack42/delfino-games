import { Dispatch, SetStateAction, createContext } from "react";

export type GameRequest = {
  user: {
    id: string;
    name: string;
  };
  game: {
    id: number;
  };
};

export type GameRequestsContextType = {
  allRequests: GameRequest[];
  setAllRequests: Dispatch<SetStateAction<GameRequest[]>>;
};

export const GameRequestsContext = createContext<GameRequestsContextType>({
  allRequests: [],
  setAllRequests: function (_: SetStateAction<GameRequest[]>): void {},
});
