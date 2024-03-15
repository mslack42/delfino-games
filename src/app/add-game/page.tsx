"use client";
import { BggSummaryData } from "@/bgg/types";
import { FormEvent, Suspense, useState } from "react";
import { SearchResults } from "./searchResults";
import { CustomButton } from "../../components/input/CustomButton";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { LoadingIdler } from "@/components/common/LoadingIdler";
import { Conditional } from "@/components/common/Conditional";

export default function AddNewGame() {
  const [searchResults, setSearchResults] = useState<BggSummaryData[]>([]);
  const [searching, setSearching] = useState<boolean>(false);

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get("searchTerm") as string;
    if (!searchTerm) {
      return;
    }
    setSearching(true);

    const searchResults = await fetch(ApiRoutes.SearchNewGame(searchTerm), {
      method: "GET",
    });
    const searchResultItems: BggSummaryData[] = (await searchResults.json())
      .results;
    setSearchResults(() => searchResultItems);
    setSearching(false);
  }

  const idler = (
    <div className="h-full w-full text-lg flex justify-center">
      <LoadingIdler />
    </div>
  );

  return (
    <>
      <div className="h-full w-full">
        <div className="py-4 text-center flex justify-center">
          <div className="flex flex-col justify-center h-full">
            <div className="py-6 w-96 rounded-lg bg-teal-200  border-solid border-4 border-teal-800">
              <div className="text-center text-teal-800 flex flex-col justify-between gap-4">
                <h1 className="text-2xl">Search for your new game</h1>
                <form onSubmit={search} className="flex justify-around gap-0">
                  <input
                    type="text"
                    name="searchTerm"
                    maxLength={100}
                    minLength={1}
                  />
                  <CustomButton
                    type="submit"
                    innerText="Go!"
                    actionType="confirm"
                    className="w-min py-1 px-3 rounded"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <Conditional when={!searching}>
          <Suspense fallback={idler}>
            <SearchResults results={searchResults}></SearchResults>
          </Suspense>
        </Conditional>
        <Conditional when={searching}>{idler}</Conditional>
      </div>
    </>
  );
}
