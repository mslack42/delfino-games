"use client";
import { BggSearchResult } from "@/bgg/types";
import { FormEvent, Suspense, useState } from "react";
import { SearchResults } from "../../components/bgg-search/searchResults";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { LoadingIdler } from "@/components/common/LoadingIdler";
import { Conditional } from "@/components/common/Conditional";
import { useToast } from "@/components/shadcn/use-toast";
import { BggSearchBox } from "../../components/bgg-search/BggSearchBox";
import {
  GameSuggestion,
  GameSuggestionsContext,
} from "@/components/game-suggestions/GameSuggestionContext";
import { GameSuggestionVotesContext } from "@/components/game-suggestion-votes/GameSuggestionVoteContext";
import Link from "next/link";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";

export function SuggestGame({
  gameSuggestions,
}: {
  gameSuggestions: GameSuggestion[];
}) {
  const [searchResults, setSearchResults] = useState<BggSearchResult[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const { toast } = useToast();

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get("searchTerm") as string;
    if (!searchTerm) {
      return;
    }
    setSearching(true);

    try {
      const searchResults = await fetch(
        ApiRoutes.SearchSuggestion(searchTerm),
        {
          method: "GET",
        }
      );

      if (!searchResults.ok) {
        toast({
          title: "Search failed",
          type: "background",
          variant: "destructive",
        });

        return;
      }

      const searchResultItems: BggSearchResult[] = (await searchResults.json())
        .results;
      setSearchResults(() => searchResultItems);
    } catch (e) {
      toast({
        title: "Search failed",
        type: "background",
        variant: "destructive",
      });
    } finally {
      setSearching(false);
    }
  }

  const idler = (
    <div className="h-full w-full text-lg flex justify-center">
      <LoadingIdler />
    </div>
  );

  const [allSuggestions, setAllSuggestions] =
    useState<GameSuggestion[]>(gameSuggestions);

  return (
    <>
      <GameSuggestionsContext.Provider
        value={{ allSuggestions, setAllSuggestions }}
      >
        <GameSuggestionVotesContext.Provider
          value={{ allVotes: [], setAllVotes: () => {}, displayVotes: false }}
        >
          <div className="h-full w-full">
            <p className="text-center px-5 pt-3">
              You can use this page to suggest new games that we don&apos;t have
              yet.
            </p>
            <p className="text-center px-5 pt-3">
              You can see all current suggestions (and vote on your favourites!){" "}
              <Link href={ApplicationRoutes.Vote} className="text-teal-800">
                here.
              </Link>
            </p>
            <BggSearchBox
              heading="Search for your suggested game"
              search={search}
            />
            <br></br>
            <Conditional when={!searching}>
              <Suspense fallback={idler}>
                <SearchResults
                  results={searchResults}
                  resultUsage="suggestGame"
                ></SearchResults>
              </Suspense>
            </Conditional>
            <Conditional when={searching}>{idler}</Conditional>
          </div>
        </GameSuggestionVotesContext.Provider>
      </GameSuggestionsContext.Provider>
    </>
  );
}
