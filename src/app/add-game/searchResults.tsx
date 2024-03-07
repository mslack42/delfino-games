import { BggSummaryData } from "@/bgg/types";
import { ActionBar } from "./ActionBar";
import { BoardGameImage } from "@/components/data-display/BoardGameImage";

type ResultsProps = {
  results: BggSummaryData[];
};

export function SearchResults(props: ResultsProps) {
  return (
    <div className="flex max-w-full flex-wrap justify-around pl-3 pr-3">
      {props.results.map((r) => (
        <SearchResult result={r} key={r.bggId}></SearchResult>
      ))}
    </div>
  );
}

type ResultProps = {
  result: BggSummaryData;
};

export function SearchResult(props: ResultProps) {
  const data = props.result;

  return (
    <div className="rounded-lg bg-card flex-none w-60 max-h-96 overflow-hidden p-2 m-1 justify-evenly text-teal-900">
      <div className="text-center font-bold line-clamp-1" title={data.name}>
        {data.name}
      </div>
      <div className="flex justify-center">
        <BoardGameImage
          imageName={data.name}
          imageUrl={data.thumb}
          size={160}
          lineHeight={36}
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: data.description! }}
        className="text-left h-36 overflow-hidden hover:overflow-y-scroll pl-1 pr-1 bg-cardScroller rounded-lg mt-2 text-teal-900"
      ></div>
      <ActionBar bggId={data.bggId}></ActionBar>
    </div>
  );
}
