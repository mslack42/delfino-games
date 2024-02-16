"use client";
import { BggSearchResult } from "@/bgg/types";
import { FormEvent, useState } from "react";
import { SearchResults } from "./searchResults";

export default function AddNewGame() {
    const [searchResults, setSearchResults] = useState<BggSearchResult[]>([])

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)

    const searchResults = await fetch(`/api/games/searchNew?name=${formData.get('searchTerm')}`, {
        method: 'GET'
    })
    const searchResultItems: BggSearchResult[] = (await searchResults.json()).results
    setSearchResults(() => searchResultItems )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Search for a game</h1>
      <form onSubmit={search}>
        <input type="text" name="searchTerm" />
        <button type="submit">Search</button>
      </form>
      <SearchResults results={searchResults}></SearchResults>
    </main>
  );
}
