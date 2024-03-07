import { twJoin } from "tailwind-merge";
import { ControlsKey } from "../types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../shadcn/ShadcnAccordion";

export type AccordionItem = {
  key: ControlsKey;
  head: string;
  body: React.ReactNode | null;
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  trayless?: boolean;
};
export type BubbleAccordionProps = {
  items: AccordionItem[];
};
export function BubbleAccordion(props: BubbleAccordionProps) {
  const openBubbles: string[] = props.items
    .filter((v) => v.open)
    .filter((v) => !v.trayless)
    .map((v) => v.head);

  return (
    <Accordion type="multiple" value={openBubbles} className="w-full">
      {props.items.map((v, i) => {
        return (
          <AccordionItem value={v.head} key={i}>
            <AccordionTrigger
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                v.setOpen(!v.open);
              }}
              className={twJoin(
                "rounded-lg text-center flex justify-center my-1 text-white w-full",
                v.open ? "bg-teal-500" : "bg-slate-400"
              )}
            >
              {v.head}
            </AccordionTrigger>
            {v.body ? (
              <AccordionContent className={twJoin("w-full p1-2 -mt-2")}>
                <div className="border-teal-500 rounded-lg border-solid border-2 ">
                  {v.body}
                </div>
              </AccordionContent>
            ) : undefined}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
