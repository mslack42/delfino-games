import { BggSummaryData } from "@/bgg/types";
import { BggLink } from "@/components/common/BggLink";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

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
  const displayImage = data.thumb ? (
    <Image
      src={data.thumb!}
      alt={data.name}
      height="160"
      width="160"
      className="w-auto h-36"
    ></Image>
  ) : (
    <div className="text-lg h-36 text-center bg-slate-400 text-gray-300 align-middle">
      <span>No image found</span>
    </div>
  );

  return (
    <div className="rounded-lg bg-cyan-200 flex-none w-60 max-h-96 overflow-hidden p-2 m-1 justify-evenly">
      <div className="text-center font-bold line-clamp-1" title={data.name}>
        {data.name}
      </div>
      <div className="flex justify-center">{displayImage}</div>
      <div
        dangerouslySetInnerHTML={{ __html: data.description! }}
        className="text-left h-36 overflow-hidden hover:overflow-y-scroll pl-1 pr-1 bg-cyan-100 rounded-lg mt-2"
      ></div>
      <ActionBar bggId={data.bggId}></ActionBar>
    </div>
  );
}

function ActionBar({ bggId }: { bggId: number }) {
  return (
    <ul className="flex flex-row-reverse gap-2 mt-1 mb-1  pt-2 pb-2">
      <li title="Add game">
        <ActionBarButton
          content={
            <Link href={`/AddGame/${bggId}`}>
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </Link>
          }
        ></ActionBarButton>
      </li>
      <li title="BoardGameGeek link">
        <ActionBarButton
          content={
            <BggLink bggId={bggId}></BggLink>
          }
        ></ActionBarButton>
      </li>
    </ul>
  );
}

function ActionBarButton({ content }: { content: React.ReactNode }) {
  return (
    <div className="cursor-pointer bg-teal-400 w-8 h-8 rounded-lg text-center flex flex-col justify-center hover:bg-teal-500">
      {content}
    </div>
  );
}
