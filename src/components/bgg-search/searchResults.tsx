import { BggSearchResult, BggSummaryData } from "@/bgg/types";
import { SearchResultActionBar } from "./SearchResultActionBar";
import { SearchResultTitle } from "./SearchResultTitle";
import { SearchResultDescription } from "./SearchResultDescription";
import { SearchResultImage } from "./SearchResultImage";
import { twJoin } from "tailwind-merge";

type ResultUsage = "addGame" | "suggestGame" | "voteForGames";

type ResultsProps = {
  results: BggSearchResult[];
  resultUsage: ResultUsage;
};

export function SearchResults(props: ResultsProps) {
  return (
    <div className="grid columns-auto w-full row-auto grid-cols-game-cards-sm md:grid-cols-game-cards-md grid-cols-game-cards gap-4 ">
      {props.results.map((r) => (
        <span className="flex justify-center" key={r.bggId}>
          <SearchResult
            result={r}
            key={r.bggId}
            resultUsage={props.resultUsage}
          ></SearchResult>
        </span>
      ))}
    </div>
  );
}

type ResultProps = {
  result: BggSearchResult;
  resultUsage: ResultUsage;
};

export function SearchResult(props: ResultProps) {
  const src = props.result.image;
  const alt = props.result.name;

  return (
    <div
      className={twJoin(
        "h-60 w-40 md:w-60 md:h-96  rounded-lg my-2",
        props.result.type == "boardgame" ? "bg-teal-600" : "bg-teal-900"
      )}
    >
      <div>
        <SearchResultImage src={src} alt={alt} />
      </div>
      <div className="absolute h-40 w-40 md:h-60 md:w-60 text-white">
        <SearchResultTitle name={props.result.name} />
      </div>
      <div className="absolute h-60 w-40 md:w-60 md:h-96 ">
        <SearchResultActionBar
          bggSearchResult={props.result}
          actionSet={props.resultUsage}
        />
      </div>
      <div
        className={twJoin(
          "absolute h-12 w-40 mt-32 md:mt-48 md:h-32 md:w-60",
          props.result.type == "boardgame"
            ? "bg-gradient-to-t from-teal-600 via-teal-600 to-transparent"
            : "bg-gradient-to-t from-teal-900 via-teal-900 to-transparent"
        )}
      >
        <SearchResultDescription text={props.result.description!} />
      </div>
    </div>
  );
}
