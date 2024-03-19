import { ExpansionSummaryCard } from "@/components/expansion-card/ExpansionSummaryCard";
import { BggExpansionSummaryData } from "@/bgg/types";

type ExpansionSelectProps = {
  expansions: BggExpansionSummaryData[];
  onToggle: (bggId: number) => void;
  selectedIds: number[];
};
export function ExpansionsSelector({
  expansions,
  onToggle,
  selectedIds,
}: ExpansionSelectProps) {
  return (
    <div className="flex justify-center flex-wrap hover:overflow-y-scroll overflow-hidden max-h-72 h-min relative">
      {expansions!.map((ex) => (
        <ExpansionSummaryCard
          data={ex}
          key={ex.bggId}
          onToggle={() => onToggle(ex.bggId)}
          selected={selectedIds.includes(ex.bggId)}
        />
      ))}
    </div>
  );
}
