"use client";
import { InventoryItem } from "@/database/types";
import { syncHash } from "@/util/hash";
import { faFont } from "@fortawesome/free-solid-svg-icons/faFont";
import { faHourglass } from "@fortawesome/free-solid-svg-icons/faHourglass";
import { faShuffle } from "@fortawesome/free-solid-svg-icons/faShuffle";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type GamesListSortingControlsProps = {
  gamesList: InventoryItem[];
  onSortChange: (sortMethod: (lst: InventoryItem[]) => InventoryItem[]) => void;
};
type SortType = "random" | "name" | "min-duration" | "min-player-count";
function average(vals: (number | null | undefined)[]) {
  const actualVals = vals.filter((v) => v) as number[];
  if (actualVals.length === 0) {
    return 0;
  }
  return actualVals.reduce((a, b) => a + b, 0) / actualVals.length;
}
export function GamesListSortControls(props: GamesListSortingControlsProps) {
  const sortBy = (type: SortType) => {
    const newSalt = Math.random().toString();
    const newSortMethod = sort(type, newSalt);
    props.onSortChange(newSortMethod);
  };

  const sort =
    (type: SortType, salt: string) => (gamesList: InventoryItem[]) => {
      if (!gamesList) {
        return gamesList;
      }

      let sorted = [...gamesList];
      switch (type) {
        case "name": {
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        }
        case "random": {
          let pairs = sorted
            .map((v) => [v, syncHash(v.name + salt)])
          pairs.sort((a, b) => (a[1] as string).localeCompare(b[1] as string))
          sorted = pairs.map((p) => p[0] as InventoryItem);
          break;
        }
        case "min-duration": {
          sorted.sort(
            (a, b) =>
              average([
                a.bggData.specs.minPlayTime,
                a.bggData.specs.maxPlayTime,
              ]) -
              average([
                b.bggData.specs.minPlayTime,
                b.bggData.specs.maxPlayTime,
              ])
          );
          break;
        }
        case "min-player-count": {
          sorted.sort(
            (a, b) =>
              average([
                a.bggData.specs.minPlayerCount,
                a.bggData.specs.maxPlayerCount,
              ]) -
              average([
                b.bggData.specs.minPlayerCount,
                b.bggData.specs.maxPlayerCount,
              ])
          );
        }
      }
      return sorted;
    };

  return (
    <>
    <div className="text-xl space-x-5">
      <span>Sort: </span>
      <button onClick={() => sortBy("random")}><FontAwesomeIcon icon={faShuffle}/></button>
      <button onClick={() => sortBy("name")}><FontAwesomeIcon icon={faFont}/></button>
      <button onClick={() => sortBy("min-duration")}><FontAwesomeIcon icon={faHourglass}/></button>
      <button onClick={() => sortBy("min-player-count")}><FontAwesomeIcon icon={faUsers}/></button>
    </div>
    </>
  );
}
