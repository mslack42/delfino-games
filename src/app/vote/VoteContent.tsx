"use client";
import { SearchResults } from "@/components/bgg-search/searchResults";
import { Conditional } from "@/components/common/Conditional";
import {
  GameSuggestionVote,
  GameSuggestionVotesContext,
} from "@/components/game-suggestion-votes/GameSuggestionVoteContext";
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
        <GameSuggestionVotesContext.Provider
          value={{ allVotes, setAllVotes, displayVotes: true }}
        >
          <Conditional when={allSuggestions.length > 0}>
            <SearchResults
              results={allSuggestions.map((gs) => gs.game)}
              resultUsage="voteForGames"
            ></SearchResults>
          </Conditional>
          <Conditional when={allSuggestions.length == 0}>
            <p>Looks like there&apos;s nothing to vote on yet...</p>
          </Conditional>
        </GameSuggestionVotesContext.Provider>
      </GameSuggestionsContext.Provider>
    </>
  );
}
