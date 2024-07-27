import { tryParseFloat } from "../util/tryParseFloat";
import { tryParseInt } from "../util/tryParseInt";
import {
  BggExpansionSummaryData,
  BggSearchResult,
  BggSummaryData,
  BoxType,
} from "./types";
import * as xml2js from "xml2js";

type BggDetailsQueryParameters = {
  idsString: string;
  includeExpansionsNested?: boolean;
};

export const fetchBggDetailsJson = async (
  idsString: string
): Promise<any[]> => {
  const bggSuggestions = await fetch(
    `https://boardgamegeek.com/xmlapi2/thing?id=${idsString}&stats=1`
  );
  const bggSuggestionsXml = await bggSuggestions.text();
  let bggJson: any;
  xml2js.parseString(bggSuggestionsXml, (err, res) => {
    if (err) {
      return [];
    }
    bggJson = res;
  });
  const searchResultsData = bggJson?.items?.item;
  return searchResultsData;
};

export const fetchBggDetails = async (
  query: BggDetailsQueryParameters
): Promise<BggSummaryData[]> => {
  const searchResultsData = await fetchBggDetailsJson(query.idsString);
  if (!searchResultsData) {
    return [];
  }
  return await parseBggDetailsIntoList(
    searchResultsData,
    !!query.includeExpansionsNested
  );
};

const fetchExpansionDetails = async (
  idsString: string
): Promise<BggExpansionSummaryData[]> => {
  const bggData = await fetch(
    `https://boardgamegeek.com/xmlapi2/thing?id=${idsString}&stats=1`
  );
  const bggXml = await bggData.text();
  let bggJson: any;
  xml2js.parseString(bggXml, (err, res) => {
    if (err) {
      return [];
    }
    bggJson = res;
  });
  const searchResultsData = bggJson?.items?.item;
  if (!searchResultsData) {
    return [];
  }
  return await parseBggExpansionDetailsIntoList(searchResultsData);
};

const parseBggExpansionDetailsIntoList = async (bggData: any[]) => {
  let output: BggExpansionSummaryData[] = [];
  for (var item of bggData) {
    if (item?.$?.type === "boardgameexpansion") {
      const res = {
        bggId: item?.$?.id,
        thumb:
          item?.thumbnail && item?.thumbnail.length
            ? item?.thumbnail[0]
            : undefined,
        image: item?.image && item?.image.length ? item?.image[0] : undefined,
        name: item?.name?.filter(
          (n: { $: { type: string } }) => n.$.type === "primary"
        )[0].$.value,
        description:
          item?.description && item?.description.length
            ? item?.description[0]
            : undefined,
      };

      const data: BggExpansionSummaryData = {
        name: res.name,
        bggId: tryParseInt(res.bggId)!,
        thumb: res.thumb,
        image: res.image,
        description: res.description,
      };
      output.push(data);
    }
  }
  output.sort((a, b) => a.name.localeCompare(b.name));
  return output;
};

const parseBggDetailsIntoList = async (
  bggData: any[],
  includeExpansions: boolean
) => {
  let output: BggSummaryData[] = [];
  for (var item of bggData) {
    if (item?.$?.type === "boardgame") {
      const res = {
        bggId: item?.$?.id,
        thumb:
          item?.thumbnail && item?.thumbnail.length
            ? item?.thumbnail[0]
            : undefined,
        image: item?.image && item?.image.length ? item?.image[0] : undefined,
        name: item?.name?.filter(
          (n: { $: { type: string } }) => n.$.type === "primary"
        )[0].$.value,
        description:
          item?.description && item?.description.length
            ? item?.description[0]
            : undefined,
        minPlayers: item?.minplayers[0].$.value,
        maxPlayers: item?.maxplayers[0].$.value,
        minPlaytime: item?.minplaytime[0].$.value,
        maxPlaytime: item?.maxplaytime[0].$.value,
        bggScore: item?.statistics[0].ratings[0].average[0].$.value,
        bggRank: item?.statistics[0].ratings[0].ranks[0].rank.filter(
          (r: { $: { name: string } }) => r.$.name === "boardgame"
        )[0].$.value,
        tags: item?.link
          .filter((l: { $: { type: string } }) =>
            ["boardgamecategory", "boardgamemechanic"].includes(l.$.type)
          )
          .map((l: { $: { value: any } }) => l.$.value),
      };

      let expansions: BggExpansionSummaryData[] = [];
      if (includeExpansions) {
        const expansionIds: string[] =
          item?.link
            .filter(
              (l: { $: { type: string } }) => l.$.type === "boardgameexpansion"
            )
            .map((l: { $: { id: any } }) => l.$.id) ?? [];
        if (expansionIds.length > 0) {
          const expansionIdString = expansionIds.join(",");
          expansions = await fetchExpansionDetails(expansionIdString);
        }
      }

      const data: BggSummaryData = {
        name: res.name,
        bggId: tryParseInt(res.bggId)!,
        thumb: res.thumb,
        image: res.image,
        description: res.description,
        boardGameDataSpecs: {
          rank: tryParseInt(res.bggRank),
          score: tryParseFloat(res.bggScore),
        },
        boardGameBggDataStats: {
          minplayers: tryParseInt(res.minPlayers),
          maxplayers: tryParseInt(res.maxPlayers),
          minplaytime_minutes: tryParseInt(res.minPlaytime),
          maxplaytime_minutes: tryParseInt(res.maxPlaytime),
          tags: res.tags,
        },
        expansions: expansions.length > 0 ? expansions : undefined,
      };
      output.push(data);
    }
  }
  return output;
};

export const parseBggSearchResults = (
  bggDetailsJson: any,
  includes?: BoxType[]
): BggSearchResult[] => {
  let output: BggSearchResult[] = [];
  let includeGames = true;
  let includeExpansions = false;
  if (!!includes) {
    if (includes.some((x) => x == "boardgame")) {
      includeGames = true;
    }
    if (includes.some((x) => x == "expansion")) {
      includeExpansions = false;
    }
  }
  for (var item of bggDetailsJson) {
    if (includeExpansions && item?.$?.type === "boardgameexpansion") {
      const res = {
        bggId: item?.$?.id,
        thumb:
          item?.thumbnail && item?.thumbnail.length
            ? item?.thumbnail[0]
            : undefined,
        image: item?.image && item?.image.length ? item?.image[0] : undefined,
        name: item?.name?.filter(
          (n: { $: { type: string } }) => n.$.type === "primary"
        )[0].$.value,
        description:
          item?.description && item?.description.length
            ? item?.description[0]
            : undefined,
      };

      const data: BggSearchResult = {
        name: res.name,
        bggId: tryParseInt(res.bggId)!,
        thumb: res.thumb,
        image: res.image,
        description: res.description,
        type: "expansion",
      };
      output.push(data);
    }
    if (includeGames && item?.$?.type === "boardgame") {
      const res = {
        bggId: item?.$?.id,
        thumb:
          item?.thumbnail && item?.thumbnail.length
            ? item?.thumbnail[0]
            : undefined,
        image: item?.image && item?.image.length ? item?.image[0] : undefined,
        name: item?.name?.filter(
          (n: { $: { type: string } }) => n.$.type === "primary"
        )[0].$.value,
        description:
          item?.description && item?.description.length
            ? item?.description[0]
            : undefined,
      };

      const data: BggSearchResult = {
        name: res.name,
        bggId: tryParseInt(res.bggId)!,
        thumb: res.thumb,
        image: res.image,
        description: res.description,
        type: "boardgame",
      };
      output.push(data);
    }
  }
  return output;
};
