"use client";
import { InventoryItem } from "@/database/types";
import { syncHash } from "@/util/hash";
import { faFont } from "@fortawesome/free-solid-svg-icons/faFont";
import { faHourglass } from "@fortawesome/free-solid-svg-icons/faHourglass";
import { faShuffle } from "@fortawesome/free-solid-svg-icons/faShuffle";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { useContext, useState } from "react";
import { SortButton } from "./SortButton";
import { average } from "./util/average";
import { GamesListContext } from "../GamesListContext";

type GamesListSortingControlsProps = {
  defaultSort: SortType;
};
export type SortType = "random" | "name" | "min-duration" | "min-player-count";
export function GamesListSortControls(props: GamesListSortingControlsProps) {
  const { setSortingMethod } = useContext(GamesListContext);
  const [reversed, setReversed] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState<SortType>(props.defaultSort);
  const sortBy = (type: SortType) => {
    let reverse = false;
    if (type === currentSort) {
      reverse = !reversed;
    }
    setReversed(reverse);
    const newSalt = Math.random().toString();
    let newSortMethod = sort(type, newSalt, reverse);
    setSortingMethod(() => newSortMethod);
  };

  const sort =
    (type: SortType, salt: string, reverse: boolean) =>
    (gamesList: InventoryItem[]) => {
      if (!gamesList) {
        return gamesList;
      }
      const dirMultiplier = reverse ? -1 : 1;

      let sorted = [...gamesList];
      switch (type) {
        case "name": {
          sorted.sort((a, b) => dirMultiplier * a.name.localeCompare(b.name));
          break;
        }
        case "random": {
          let pairs = sorted.map((v) => [v, syncHash(v.name + salt)]);
          pairs.sort(
            (a, b) =>
              dirMultiplier * (a[1] as string).localeCompare(b[1] as string)
          );
          sorted = pairs.map((p) => p[0] as InventoryItem);
          break;
        }
        case "min-duration": {
          sorted.sort(
            (a, b) =>
              dirMultiplier *
              (average([
                a.bggData.specs.minPlayTime,
                a.bggData.specs.maxPlayTime,
              ]) -
                average([
                  b.bggData.specs.minPlayTime,
                  b.bggData.specs.maxPlayTime,
                ]))
          );
          break;
        }
        case "min-player-count": {
          sorted.sort(
            (a, b) =>
              dirMultiplier *
              (average([
                a.bggData.specs.minPlayerCount,
                a.bggData.specs.maxPlayerCount,
              ]) -
                average([
                  b.bggData.specs.minPlayerCount,
                  b.bggData.specs.maxPlayerCount,
                ]))
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
