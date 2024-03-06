"use client";
import { InventoryItem } from "@/database/types";
import { syncHash } from "@/util/hash";
import { faFont } from "@fortawesome/free-solid-svg-icons/faFont";
import { faHourglass } from "@fortawesome/free-solid-svg-icons/faHourglass";
import { faShuffle } from "@fortawesome/free-solid-svg-icons/faShuffle";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { useState } from "react";
import { SortButton } from "./SortButton";
import { average } from "./util/average";

type GamesListSortingControlsProps = {
  defaultSort: SortType;
  gamesList: InventoryItem[];
  onSortChange: (sortMethod: (lst: InventoryItem[]) => InventoryItem[]) => void;
};
export type SortType = "random" | "name" | "min-duration" | "min-player-count";
export function GamesListSortControls(props: GamesListSortingControlsProps) {
  const [currentSort, setCurrentSort] = useState<SortType>(props.defaultSort);
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
          let pairs = sorted.map((v) => [v, syncHash(v.name + salt)]);
          pairs.sort((a, b) => (a[1] as string).localeCompare(b[1] as string));
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
      setCurrentSort(type);
      return sorted;
    };

  return (
    <>
      <div className="space-x-3 text-xl rounded border-2 border-black p-1">
        <span>Sort:</span>
        <SortButton
          type={"name"}
          sortMethod={sortBy}
          icon={faFont}
          isActive={currentSort === "name"}
        />
        <SortButton
          type={"min-duration"}
          sortMethod={sortBy}
          icon={faHourglass}
          isActive={currentSort === "min-duration"}
        />
        <SortButton
          type={"min-player-count"}
          sortMethod={sortBy}
          icon={faUsers}
          isActive={currentSort === "min-player-count"}
        />
        <SortButton
          type={"random"}
          sortMethod={sortBy}
          icon={faShuffle}
          isActive={currentSort === "random"}
        />
      </div>
    </>
  );
}
