"use client";
import { BggDataSummary } from "@/components/data-display/BggDataSummary";
import { AddGameForm } from "./AddGameForm";
import { ExpansionsSummarySelect } from "./ExpansionsSummarySelect";
import { BggSummaryData } from "@/bgg/types";
import { AddGameContext, AddGameContextType } from "./AddGameContext";
import { useState } from "react";
import { Location } from "@prisma/client";

type AddGameProps = {
  data: BggSummaryData;
  holders: { id: number; name: string; location: Location }[];
};
export function AddGame({ data, holders }: AddGameProps) {
  let [selectedExpansionBggIds, setSelectedExpansionBggIds] = useState<
    number[]
  >([]);

  let context: AddGameContextType = {
    bggData: data,
    selectedExpansionBggIds: selectedExpansionBggIds,
    setSelectedExpansionBggIds: setSelectedExpansionBggIds,
    holders: holders.map((h) => {
      return {
        id: h.id,
        location: h.location,
        name: h.name,
      };
    }),
  };

  return (
    <AddGameContext.Provider value={context}>
      <div className="w-full max-w-4xl">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 ">
            <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg">
              <BggDataSummary data={data}></BggDataSummary>
            </div>
          </div>
          <div className="w-full md:w-1/2 ">
            <ExpansionsSummarySelect />
            <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg">
              <AddGameForm className="flex flex-col justify-center items-center max-w-4/5"></AddGameForm>
            </div>
          </div>
        </div>
      </div>
    </AddGameContext.Provider>
  );
}
