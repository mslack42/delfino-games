import { FilterBubbleData } from "../../../input/FilterBubbleBucket";

export function sortBubbleData(data: FilterBubbleData[]) {
  let newData = [...data];
  newData.sort((a, b) => a.name.localeCompare(b.name));
  return newData;
}
