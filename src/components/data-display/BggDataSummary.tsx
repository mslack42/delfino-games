import { BggSummaryData } from "@/bgg/types";
import { playTime, playerCount } from "@/util/text-formatting";
import React from "react";
import { BggLink } from "../common/BggLink";
import { DataSummaryKeyValuePair } from "./DataSummaryKeyValuePair";
import { TagBucket } from "../common/TagBucket";
import { ScrollBox } from "../common/ScrollBox";
import { BoardGameImage } from "./BoardGameImage";

type Props = {
  data: BggSummaryData;
  className?: string;
};

export function BggDataSummary(props: Props) {
  const { data, className } = props;

  return (
    <div className={className}>
      <div className="flex justify-center p-4">
        <BoardGameImage
          imageUrl={data.image}
          imageName={data.name}
          size={200}
          lineHeight={60}
        />
      </div>
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
            <ScrollBox>
              <div
                dangerouslySetInnerHTML={{ __html: data.description! }}
                className="w-full"
              ></div>
            </ScrollBox>
          }
          isMultiline
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey={"Tags"}
          dataValue={
            <ScrollBox>
              <TagBucket tags={data.boardGameBggDataStats.tags}></TagBucket>
            </ScrollBox>
          }
          isMultiline
        ></DataSummaryKeyValuePair>
      </div>
    </div>
  );
}
