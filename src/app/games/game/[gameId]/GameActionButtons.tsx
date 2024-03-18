"use client";
import Link from "next/link";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";
import { useState } from "react";
import { DeleteGameModal } from "./DeleteGameModal";

export function GameActionButtons(props: { id: number }) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  return (
    <>
      <div className="text-right text-lg flex flex-end p-2 space-x-2">
        <Link href={ApplicationRoutes.EditGame(props.id)} className="">
          <div className="bg-teal-500 w-min space-x-2 flex align-bottom p-1 rounded-lg">
            <span>Edit </span>
            <CustomFontAwesomeIcon icon={faPenToSquare} />
          </div>
        </Link>
        <div
          onClick={() => setDeleteId(props.id)}
          className="bg-teal-500 w-min space-x-2 flex align-bottom p-1 rounded-lg"
        >
          <span>Delete </span>
          <CustomFontAwesomeIcon icon={faTrash} />
        </div>
      </div>
      <DeleteGameModal deleteId={deleteId} setDeleteId={setDeleteId} />
    </>
  );
}
