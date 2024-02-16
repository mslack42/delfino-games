import { BggSearchResult } from "@/bgg/types"
import Image from "next/image"

type ResultsProps = {
    results: BggSearchResult[]
}

export function SearchResults(props: ResultsProps) {
    return <div className="flex max-w-full flex-wrap justify-between">
        {props.results.map(r => <SearchResult result={r} key={r.bggId}></SearchResult>)}
    </div>
}

type ResultProps = {
    result: BggSearchResult
}

export function SearchResult(props: ResultProps) {
    const data = props.result
    return <div className="rounded-sm bg-green-200 flex-none w-60 max-h-80 overflow-hidden">
        <div className="text-center">{data.name}</div>
        <div className="flex justify-center">{data.thumb ?<Image src={data.thumb!} alt={data.name} height="150" width="150" className="w-auto h-36"></Image>: undefined}</div>
        <div dangerouslySetInnerHTML={{__html :data.description!}}></div>
    </div>
}