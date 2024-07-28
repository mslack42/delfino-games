"use client";
import { SearchResults } from "@/components/bgg-search/searchResults";
import { Conditional } from "@/components/common/Conditional";
import {
  GameSuggestionVotesContext,
  GameSuggestionVote,
} from "@/components/game-suggestion-votes/GameSuggestionVoteContext";
import {
  GameSuggestion,
  GameSuggestionsContext,
} from "@/components/game-suggestions/GameSuggestionContext";
import { useState } from "react";

export function ProfileGameSuggestionsContent({
  gameSuggestions,
  votes,
  userId,
}: {
  gameSuggestions: GameSuggestion[];
  votes: GameSuggestionVote[];
  userId: string;
}) {
  const thisUsersGamesSuggestions = gameSuggestions.filter(
    (gs) => gs.user.id == userId
  );
  const [allSuggestions, setAllSuggestions] =
    useState<GameSuggestion[]>(gameSuggestions);
  const [allVotes, setAllVotes] = useState<GameSuggestionVote[]>(votes);

  const thisUsersVotes = votes.map((v) => v.bggGameId);
  const thisUsersGamesSuggestionsVotedFor = allSuggestions.filter((gs) =>
    thisUsersVotes.includes(gs.game.bggId)
  );

  return (
    <>
      <GameSuggestionsContext.Provider
        value={{ allSuggestions, setAllSuggestions }}
      >
        <GameSuggestionVotesContext.Provider
          value={{ allVotes, setAllVotes, displayVotes: false }}
        >
          <Conditional when={thisUsersGamesSuggestions.length > 0}>
            <div className="w-full">
              <h2 className="w-full text-4xl">Your Game Suggestions</h2>
              <SearchResults
                results={thisUsersGamesSuggestions.map((gs) => gs.game)}
                resultUsage="suggestGame"
              ></SearchResults>
            </div>
          </Conditional>
          <Conditional when={thisUsersGamesSuggestionsVotedFor.length > 0}>
            <div className="w-full">
              <h2 className="w-full text-4xl">Your Votes</h2>
              <SearchResults
                results={thisUsersGamesSuggestionsVotedFor.map((gs) => gs.game)}
                resultUsage="voteForGames"
              ></SearchResults>
            </div>
          </Conditional>
        </GameSuggestionVotesContext.Provider>
      </GameSuggestionsContext.Provider>
    </>
  );
}
