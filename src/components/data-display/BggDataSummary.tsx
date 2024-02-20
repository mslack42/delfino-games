import { BggSummaryData } from "@/bgg/types";
import Image from "next/image";
import { KeyValue } from "../common/KeyValue";
import { playTime, playerCount } from "@/util/text-formatting";
import React from "react";
import { BggLink } from "../common/BggLink";

type Props = {
  data: BggSummaryData;
  className?: string;
};

export function BggDataSummary(props: Props) {
  const { data, className } = props;

  const displayImage = data.image ? (
    <Image
      src={data.image!}
      alt={data.name}
      height="200"
      width="200"
      className="w-auto h-60"
    ></Image>
  ) : (
    <div className="text-lg h-60 text-center bg-slate-400 text-gray-300 align-middle">
      <span>No image found</span>
    </div>
  );

  return (
    <div className={className}>
      <div className="flex justify-center p-4">{displayImage}</div>
      <h1 className="text-2xl font-bold pt-2">{data.name}</h1>
      <div className="flex justify-center items-center text-center flex-col ">
        <DataSummaryKeyValuePair
          dataKey="Players"
          dataValue={playerCount(
            data.boardGameBggDataStats.maxplayers,
            data.boardGameBggDataStats.minplayers
          )}
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey="Duration"
          dataValue={playTime(
            data.boardGameBggDataStats.maxplaytime_minutes,
            data.boardGameBggDataStats.minplaytime_minutes
          )}
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey="BGG rank"
          dataValue={(data.boardGameDataSpecs.rank ?? "?").toString()}
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey="BGG score"
          dataValue={(data.boardGameDataSpecs.score ?? "?").toString()}
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey={"Link"}
          dataValue={<BggLink bggId={data.bggId}></BggLink>}
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey={"Description"}
          dataValue={
            <ScrollBox
              content={
                <div
                  dangerouslySetInnerHTML={{ __html: data.description! }}
                  className="w-full"
                ></div>
              }
            ></ScrollBox>
          }
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey={"Tags"}
          dataValue={
            <ScrollBox
              content={
                <TagBucket
                  tags={data.boardGameBggDataStats.tags}
                ></TagBucket>
              }
            ></ScrollBox>
          }
        ></DataSummaryKeyValuePair>
      </div>
    </div>
  );
}

type DataSummaryKeyValueProps = {
  dataKey: string;
  dataValue: string | React.ReactNode;
};

function DataSummaryKeyValuePair(props: DataSummaryKeyValueProps) {
  return (
    <KeyValue
      dataKey={props.dataKey}
      dataValue={props.dataValue}
      className="flex flex-wrap justify-between w-4/5"
    ></KeyValue>
  );
}

type ScrollBoxProps = {
  content: React.ReactNode;
};

function ScrollBox(props: ScrollBoxProps) {
  return (
    <div className="max-h-36 min-w-full text-left overflow-hidden hover:overflow-y-scroll pl-4 pr-4 bg-teal-300 rounded-lg ">
      {props.content}
    </div>
  );
}

type TagBucketProps = {
  tags: string[];
};

function TagBucket(props: TagBucketProps) {
  return (
    <div className="flex flex-wrap text-left justify-items-start justify-start gap-2 text-sm pt-2 pb-2">
      {props.tags.map((t) => (
        <Tag tag={t} key={t}></Tag>
      ))}
    </div>
  );
}

type TagProps = {
  tag: string;
};
function Tag(props: TagProps) {
  return <div className="bg-indigo-300 p-1 rounded-lg">{props.tag}</div>;
}
