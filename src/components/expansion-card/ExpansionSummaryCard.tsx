import { BggExpansionSummaryData } from "@/bgg/types";
import { twJoin } from "tailwind-merge";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { BggLink } from "@/components/common/BggLink";
import { ExpansionSummaryCardImage } from "./ExpansionSummaryCardImage";
import { ExpansionSummaryActionButton } from "./ExpansionSummaryActionButton";
import { Conditional } from "../common/Conditional";

type ExpansionSummaryCardProps = {
  data: BggExpansionSummaryData;
  onToggle?: () => void;
  selected?: boolean;
};
export function ExpansionSummaryCard({
  data,
  onToggle,
  selected,
}: ExpansionSummaryCardProps) {
  return (
    <div className="rounded-xl h-36 w-36 md:h-40 md:w-40 overflow-hidden mx-2 my-2 relative">
      <div>
        <div
          className={twJoin(
            "flex justify-center h-full absolute ",
            selected ? "" : "grayscale"
          )}
        >
          <ExpansionSummaryCardImage src={data.image!} alt={data.name} />
        </div>
      </div>
      <div
        className={twJoin(
          "absolute h-10 w-36 md:w-40 md:h-15 text-white",
          selected ? "" : "grayscale"
        )}
      >
        <div className="bg-gradient-to-b from-teal-600 via-teal-600 to-transparent py-1 rounded-lg">
          <h1 className="text-center text-xs md:text-sm font-bold line-clamp-2 text-wrap ">
            {data.name}
          </h1>
        </div>
      </div>
      <div className="absolute h-36 w-36 md:h-40 md:w-40 text-white filter-none pointer-events-none">
        <div
          className={twJoin(
            "absolute bottom-0 right-0 rounded-lg pr-2 pb-2 text-sm pointer-events-none h-10",
            "bg-gradient-to-t from-teal-600 via-teal-600 to-transparent w-full",
            selected ? "" : "grayscale"
          )}
        ></div>
      </div>
      <div className="absolute h-36 w-36 md:h-40 md:w-40 text-white filter-none pointer-events-none">
        <div className="absolute bottom-0 right-0 rounded-lg pr-2 pb-2 text-sm pointer-events-none ">
          <ul className="flex flex-row justify-end space-x-2">
            <li>
              <ExpansionSummaryActionButton>
                <BggLink bggId={data.bggId} />
              </ExpansionSummaryActionButton>
            </li>
            <Conditional when={!!onToggle}>
              <li>
                <ExpansionSummaryActionButton
                  onClick={onToggle}
                  aria-label={
                    selected ? "deselect expansion" : "select expansion"
                  }
                >
                  <CustomFontAwesomeIcon icon={selected ? faTimes : faPlus} />
                </ExpansionSummaryActionButton>
              </li>
            </Conditional>
          </ul>
        </div>
      </div>
    </div>
  );
}
