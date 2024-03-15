"use client";
import { Tag } from "@/components/common/Tag";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ShadcnAccordion";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { Location } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

type GameHolderListProps = {
  offices: Location[];
  holders: {
    name: string;
    location: Location;
  }[];
};
export function GameHolderList(props: GameHolderListProps) {
  const [openBubbles, setOpenBubbles] = useState<Location[]>([]);

  return (
    <Accordion type="multiple" value={openBubbles} className="w-full">
      {props.offices.map((v, i) => {
        const isOpen = openBubbles.includes(v);
        return (
          <AccordionItem value={v} key={i}>
            <AccordionTrigger
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isOpen) {
                  setOpenBubbles([...openBubbles, v]);
                } else {
                  setOpenBubbles(openBubbles.filter((b) => b !== v));
                }
              }}
              className={twJoin(
                "rounded-lg text-center flex justify-center my-1 text-white w-full",
                isOpen ? "bg-teal-500" : "bg-slate-400"
              )}
            >
              <h2 className="text-2xl">{v}</h2>
            </AccordionTrigger>
            <AccordionContent className={twJoin("w-full p1-2 -mt-2")}>
              <div className="border-teal-500 rounded-lg border-solid border-2 flex flex-row flex-wrap py-4 space-x-4 justify-center">
                {props.holders
                  .filter((h) => h.location === v)
                  .map((h, k) => (
                    <>
                      <Tag
                        className="rounded-full"
                        key={k}
                        tag={
                          <Link href={ApplicationRoutes.PersonsGames(h.name)}>
                            <div className="text-2xl p-2 w-min whitespace-nowrap">
                              {h.name}
                            </div>
                          </Link>
                        }
                      ></Tag>
                    </>
                  ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
