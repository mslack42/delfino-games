import * as xml2js from "xml2js";
import { BggSummaryData } from "./types";
import { fetchBggDetails } from "./fetchBggDetails";
import { levenshtein } from "@/util/levenshtein";

export const searchGames = async (name: string): Promise<BggSummaryData[]> => {
  const bggData = await fetch(
    `https://boardgamegeek.com/xmlapi/search?type=boardgame&search=${name}`
  );
  const bggXml = await bggData.text();
  let bggJson: any;
  xml2js.parseString(bggXml, (err, res) => {
    if (err) {
      return [];
    }
    bggJson = res;
  });
  const data = await parseBggDataIntoList(bggJson, name);

  return data;
};

const parseBggDataIntoList = async (bggData: any, searchTerm: string) => {
  let searchResults: any[] = bggData?.boardgames?.boardgame;
  if (!searchResults) {
    return [];
  }
  searchResults = searchResults
    .map((d) => [d, levenshtein(searchTerm, d.name[0]["_"])])
    .sort((a, b) => a[1] - b[1])
    .map((p) => p[0])
    .slice(0, 20);
  let bggIds: string[] = [];
  for (var item of searchResults) {
    const bggId = item?.$?.objectid;
    if (bggId) {
      bggIds.push(bggId);
    }
  }

  return await fetchBggDetails(bggIds.join(","));
};
