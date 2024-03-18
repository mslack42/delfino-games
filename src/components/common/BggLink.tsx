"use client";

import { bggUrl } from "@/util/text-formatting";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { CustomFontAwesomeIcon } from "./CustomFontAwesomeIcon";

type BggLinkProps = {
  bggId: number;
};

function openNewTab(address: string) {
  window.open(address, "_blank");
}

export function BggLink(props: BggLinkProps) {
  return (
    <div
      className="cursor-pointer"
      onClick={() => openNewTab(bggUrl(props.bggId))}
    >
      <CustomFontAwesomeIcon icon={faLink}></CustomFontAwesomeIcon>
    </div>
  );
}
