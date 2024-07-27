import * as xml2js from "xml2js";
import { BggSearchResult, BggSummaryData } from "./types";
import {
  fetchBggDetails,
  fetchBggDetailsJson,
  parseBggSearchResults,
} from "./fetchBggDetails";
import { levenshtein } from "@/util/levenshtein";

export const searchGamesAndExpansions = async (
  name: string
): Promise<BggSearchResult[]> => {
  const bggJson = await bggSearch(name);
  const bggIds = extractBggIds(bggJson, name);
  const data = await fetchBggDetailsJson(bggIds);

  return parseBggSearchResults(data, ["boardgame", "expansion"]);
};

export const searchGames = async (name: string): Promise<BggSearchResult[]> => {
  const bggJson = await bggSearch(name);
  const bggIds = extractBggIds(bggJson, name);
  const data = await fetchBggDetailsJson(bggIds);

  return parseBggSearchResults(data, ["boardgame"]);
};

const bggSearch = async (name: string): Promise<any> => {
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
  return bggJson;
};

const extractBggIds = (bggData: any, searchTerm: string): string => {
  let searchResults: any[] = bggData?.boardgames?.boardgame;
  if (!searchResults) {
    return "";
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
  return bggIds.join(",");
};
