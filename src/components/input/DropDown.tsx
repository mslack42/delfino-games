"use client";
import React, { useState } from "react";
import { twJoin } from "tailwind-merge";

type DropDownProps = {
  head: React.ReactNode;
  items: React.ReactNode[];
};
export function DropDown(props: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const listStyle = isOpen ? "" : " hidden";
  return (
    <>
      <div
        className="w-auto text-right flex justify-end flex-wrap"
        onMouseLeave={() => setIsOpen(false)}
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(false)}
      >
        <div>{props.head}</div>
        <div className="top-0 right-0 w-full flex justify-end overflow-x-visible">
          <ul
            className={twJoin(
              listStyle,
              " bg-teal-100 overflow-visible absolute text-slate-900 w-auto "
            )}
          >
            {props.items.map((item, i) => (
              <li key={i} className="px-1 w-full">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
