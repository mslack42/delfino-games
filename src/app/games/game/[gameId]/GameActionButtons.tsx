"use client";
import Link from "next/link";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ApplicationRoutes } from "@/constants/routes";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";

export function GameActionButtons(props: { id: number }) {
  return (
    <div className="text-right text-lg flex flex-end p-2">
      <Link href={ApplicationRoutes.EditGame(props.id)} className="">
        <div className="bg-teal-500 w-min space-x-2 flex align-bottom p-1 rounded-lg">
          <span>Edit </span>
          <CustomFontAwesomeIcon icon={faPenToSquare} />
        </div>
      </Link>
    </div>
  );
}
