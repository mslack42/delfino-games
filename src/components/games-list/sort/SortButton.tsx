"use client";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twJoin } from "tailwind-merge";
import { SortType } from "./GamesListSortControls";
import { useEffect, useState } from "react";

type SortButtonProps = {
  type: SortType;
  sortMethod: (type: SortType) => void;
  icon: IconDefinition;
  isActive: boolean;
};
export function SortButton(props: SortButtonProps) {
  const { type, sortMethod, icon, isActive } = props;
  const [mounted, setMounted] = useState(false);

  // Check for mount before loading fa icons, else they go bug-eyed
  // Might be able to mitigate with caching?
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => sortMethod(type)}
        className={twJoin(
          "w-7 h-7 rounded-lg",
          isActive ? "bg-teal-600" : "bg-slate-300"
        )}
      >
        {mounted && <FontAwesomeIcon icon={icon} />}
      </button>
    </>
  );
}
