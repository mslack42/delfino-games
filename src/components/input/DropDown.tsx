"use client";
import React, { useState } from "react";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem } from "@mui/base/MenuItem";
import { twJoin } from "tailwind-merge";

type DropDownProps = {
  head: React.ReactNode;
  items: React.ReactNode[];
  highlightHover?: boolean,
  className? : string
};
export function DropDown(props: DropDownProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dropdown open={open} >
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onClick={() => setOpen(false)}
          className={props.className}
        >
          <MenuButton>{props.head}</MenuButton>
          <Menu
            className="z-[502]"
            slotProps={{
              listbox: {
                className:
                  "z-[502] bg-teal-100 rounded-lg overflow-auto min-w-20 p-2",
              },
            }}
          >
            {props.items.map((it, i) => (
              <MenuItem
                key={i}
                className={twJoin([
                  "z-[1002] cursor-pointer rounded-lg last:border-b-0 px-2 focus:outline-none",
                  props.highlightHover ? "focus:bg-teal-500 focus:text-white" : ""
                ])}
              >
                {it}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Dropdown>
    </>
  );
}
