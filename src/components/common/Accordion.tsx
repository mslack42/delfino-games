import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../shadcn/ShadcnAccordion";

type AccordionItem = {
  head: string;
  body: React.ReactNode;
  open: boolean;
  setOpen: (newOpen: boolean) => void;
};
export type BubbleAccordionProps = {
  items: AccordionItem[];
};
export function BubbleAccordion(props: BubbleAccordionProps) {
  const openBubbles: string[] = props.items
    .filter((v) => v.open)
    .map((v) => v.head);

  return (
    <Accordion type="multiple" value={openBubbles}>
      {props.items.map((v, i) => {
        return (
          <AccordionItem value={v.head} key={i}>
            <AccordionTrigger
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                v.setOpen(!v.open);
              }}
            >
              {v.head}
            </AccordionTrigger>
            <AccordionContent>{v.body}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
