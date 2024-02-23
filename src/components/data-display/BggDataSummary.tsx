import { BggSummaryData } from "@/bgg/types";
import Image from "next/image";
import { playTime, playerCount } from "@/util/text-formatting";
import React from "react";
import { BggLink } from "../common/BggLink";
import { DataSummaryKeyValuePair } from "./DataSummaryKeyValuePair";
import { TagBucket } from "../common/TagBucket";
import { ScrollBox } from "../common/ScrollBox";

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
          isMultiline
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
          isMultiline
        ></DataSummaryKeyValuePair>
      </div>
    </div>
  );
}


