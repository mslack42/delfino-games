export type BggSummaryData = {
  name: string;
  bggId: number;
  thumb: string | undefined;
  image: string | undefined;
  description: string | undefined;
  boardGameDataSpecs: {
    rank: number | undefined;
    score: number | undefined;
  };
  boardGameBggDataStats: {
    minplayers: number | undefined;
    maxplayers: number | undefined;
    minplaytime_minutes: number | undefined;
    maxplaytime_minutes: number | undefined;
    tags: string[];
  };
  expansions?: BggExpansionSummaryData[];
};

export type BggExpansionSummaryData = {
  name: string;
  bggId: number;
  thumb: string | undefined;
  image: string | undefined;
  description: string | undefined;
};

export type BoxType = "boardgame" | "expansion";
export type BggSearchResult = {
  name: string;
  bggId: number;
  thumb: string | undefined;
  image: string | undefined;
  description: string | undefined;
  type: BoxType;
};
