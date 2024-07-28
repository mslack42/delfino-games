"use client";
import { SearchResults } from "@/components/bgg-search/searchResults";
import {
  GameSuggestionVote,
  GameSuggestionVotesContext,
} from "@/components/game-suggestion-votes/GameSuggestionContext";
import {
  GameSuggestion,
  GameSuggestionsContext,
} from "@/components/game-suggestions/GameSuggestionContext";

import { useState } from "react";

export function VoteContent({
  gameSuggestions,
  votes,
}: {
  gameSuggestions: GameSuggestion[];
  votes: GameSuggestionVote[];
}) {
  const [allSuggestions, setAllSuggestions] =
    useState<GameSuggestion[]>(gameSuggestions);
  const [allVotes, setAllVotes] = useState<GameSuggestionVote[]>(votes);

  return (
    <>
      <h1 className="text-4xl py-2">All Suggested Games</h1>
      <GameSuggestionsContext.Provider
        value={{ allSuggestions, setAllSuggestions }}
      >
        <GameSuggestionVotesContext.Provider value={{ allVotes, setAllVotes }}>
          <SearchResults
            results={gameSuggestions.map((gs) => gs.game)}
            resultUsage="voteForGames"
          ></SearchResults>
        </GameSuggestionVotesContext.Provider>
      </GameSuggestionsContext.Provider>
    </>
  );
}
