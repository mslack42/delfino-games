import { BggSummaryData } from "@/bgg/types";
import { SearchResultActionBar } from "./SearchResultActionBar";
import { SearchResultTitle } from "./SearchResultTitle";
import { SearchResultDescription } from "./SearchResultDescription";
import { SearchResultImage } from "./SearchResultImage";

type ResultsProps = {
  results: BggSummaryData[];
};

export function SearchResults(props: ResultsProps) {
  return (
    <div className="grid columns-auto w-full row-auto grid-cols-game-cards-sm md:grid-cols-game-cards-md grid-cols-game-cards gap-4 ">
      {props.results.map((r) => (
        <span className="flex justify-center" key={r.bggId}>
          <SearchResult result={r} key={r.bggId}></SearchResult>
        </span>
      ))}
    </div>
  );
}

type ResultProps = {
  result: BggSummaryData;
};

export function SearchResult(props: ResultProps) {
  const src = props.result.image;
  const alt = props.result.name;
  const bggId = props.result.bggId;

  return (
    <div className="h-60 w-40 md:w-60 md:h-96 bg-teal-600 rounded-lg my-2">
      <div>
        <SearchResultImage src={src} alt={alt} />
      </div>
      <div className="absolute h-40 w-40 md:h-60 md:w-60 text-white">
        <SearchResultTitle name={props.result.name} />
      </div>
      <div className="absolute h-60 w-40 md:w-60 md:h-96 ">
        <SearchResultActionBar bggId={bggId} />
      </div>
      <div className="absolute h-12 w-40 mt-32 md:mt-48 md:h-32 md:w-60 bg-gradient-to-t from-teal-600 via-teal-600 to-transparent">
        <SearchResultDescription text={props.result.description!} />
      </div>
    </div>
  );
}
