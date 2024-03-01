"use client";
import { DropDown } from "../input/DropDown";

type NavigationSubMenuProps = {
  depth: "Nested" | "Unnested";
  head: React.ReactNode;
  items: React.ReactNode[];
};

export function NavigationSubMenu(props: NavigationSubMenuProps) {
  const { depth, head, items } = props;
  return (
    <>
      {depth == "Nested" ? (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-teal-400 py-1 rounded-lg"
          >
            {head}
          </div>
          <ul className="pl-2 py-1 rounded-lg">
            {items.map((item, k) => (
              <li
                className=" text-black hover:bg-teal-400 cursor-pointer rounded-lg focus:bg-teal-400 hover:text-white focus:text-white focus:outline-none px-2"
                key={k}
              >
                {item}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <DropDown head={head} items={items} highlightHover={true}></DropDown>
      )}
    </>
  );
}
