"use server";
import { BggSummaryData } from "@/bgg/types";
import { Location, Ownership } from "@prisma/client";

export type DsGameData = {
  ownership: Ownership;
  location: Location;
  ownerId?: number;
  newOwner?: string;
  holderId?: number;
  newHolder?: string;
  isInRotation: boolean;
};

export type NewGameData = DsGameData & {
  bggData: BggSummaryData;
};
