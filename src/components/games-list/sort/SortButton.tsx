"use client";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { twJoin } from "tailwind-merge";
import { SortType } from "./GamesListSortControls";
import { CustomFontAwesomeIcon } from "../../common/CustomFontAwesomeIcon";

type SortButtonProps = {
  type: SortType;
  sortMethod: (type: SortType) => void;
  icon: IconDefinition;
  isActive: boolean;
};
export function SortButton(props: SortButtonProps) {
  const { type, sortMethod, icon, isActive } = props;

  return (
    <>
      <button
        onClick={() => sortMethod(type)}
        className={twJoin(
          "w-7 h-7 rounded-lg",
          isActive ? "bg-teal-600" : "bg-slate-300"
        )}
      >
        <CustomFontAwesomeIcon icon={icon} />
      </button>
    </>
  );
}
