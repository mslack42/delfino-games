import { InventoryItem } from "@/database/types";
import { Conditional } from "@/components/common/Conditional";
import { ExpansionSummaryCard } from "@/components/expansion-card/ExpansionSummaryCard";

type ExpansionProps = {
  data: InventoryItem;
};
export function ExpansionList({ data }: ExpansionProps) {
  const expansions = data.dsData.ownedExpansions;
  return (
    <Conditional when={expansions && expansions.length > 0}>
      <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg max-w-full">
        <div>
          <h1 className="text-2xl font-bold pt-2">With Expansions:</h1>
          <div className="min-w-full max-h-96 flex flex-row justify-center flex-wrap overflow-hidden hover:overflow-y-scroll bg-cardScroller rounded-xl">
            {expansions!.map((ex) => (
              <ExpansionSummaryCard data={ex} key={ex.bggId} selected={true} />
            ))}
          </div>
        </div>
      </div>
    </Conditional>
  );
}
