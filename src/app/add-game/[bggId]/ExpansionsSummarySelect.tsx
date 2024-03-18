import { Conditional } from "@/components/common/Conditional";
import { ExpansionSummaryCard } from "@/components/expansion-card/ExpansionSummaryCard";
import { useContext } from "react";
import { AddGameContext } from "./AddGameContext";

export function ExpansionsSummarySelect() {
  const { bggData, selectedExpansionBggIds, setSelectedExpansionBggIds } =
    useContext(AddGameContext);
  const expansions = bggData.expansions;

  const onToggle = (bggId: number) => {
    if (selectedExpansionBggIds.includes(bggId)) {
      setSelectedExpansionBggIds(
        selectedExpansionBggIds.filter((id) => id != bggId)
      );
    } else {
      setSelectedExpansionBggIds([...selectedExpansionBggIds, bggId]);
    }
  };

  return (
    <Conditional when={!!expansions && expansions!.length > 0}>
      <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg">
        <h1 className="text-2xl font-bold pt-2">Possible Expansions:</h1>
        <div className="flex justify-center flex-wrap hover:overflow-y-scroll overflow-hidden max-h-72 h-min relative">
          {expansions!.map((ex) => (
            <ExpansionSummaryCard
              data={ex}
              key={ex.bggId}
              onToggle={() => onToggle(ex.bggId)}
              selected={selectedExpansionBggIds.includes(ex.bggId)}
            />
          ))}
        </div>
      </div>
    </Conditional>
  );
}
