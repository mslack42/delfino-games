import { Conditional } from "@/components/common/Conditional";
import { useContext } from "react";
import { AddGameContext } from "./AddGameContext";
import { ExpansionsSelector } from "../../../components/expansion-card/ExpansionsSelector";

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
        <ExpansionsSelector
          expansions={expansions!}
          onToggle={onToggle}
          selectedIds={selectedExpansionBggIds}
        />
      </div>
    </Conditional>
  );
}
