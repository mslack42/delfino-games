import { fetchBggDetails } from "./fetchBggDetails";
import { BggSummaryData } from "./types";

export const getGame = async (id: number): Promise<BggSummaryData | null> => {
  const data = await fetchBggDetails({ idsString: id.toString() });
  return data.length ? data[0] : null;
};
