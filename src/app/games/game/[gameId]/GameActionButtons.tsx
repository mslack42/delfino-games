"use client";
import Link from "next/link";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ApiRoutes, ApplicationRoutes } from "@/constants/routes";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";

export function GameActionButtons(props: { id: number }) {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);
  const router = useRouter();

  const deleteHandler = async (id: number | undefined | null) => {
    if (id) {
      await fetch(ApiRoutes.DeleteGame(id!.toString()), {
        method: "DELETE",
      });
      setDeleteId(null);
      router.push(ApplicationRoutes.Games);
    }
  };

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
      <CustomModal
        isOpen={!!deleteId}
        title={<b>Are you sure you want to delete this game?</b>}
        subtitle={<p>This action is permanent.</p>}
        content={
          <div>
            <div className="flex flex-row justify-evenly space-x-2">
              <input
                type="text"
                placeholder="type 'confirm delete'"
                onChange={(evt) => {
                  setDeleteConfirmed(
                    evt.currentTarget.value === "confirm delete"
                  );
                }}
                className="px-2"
              ></input>
              <div className="flex flex-row justify-end w-full space-x-2">
                <CustomButton
                  type="button"
                  innerText={"Yes"}
                  className="rounded p-2"
                  onClick={() => deleteHandler(deleteId)}
                  disabled={!deleteConfirmed}
                />
                <CustomButton
                  type="button"
                  innerText={"No"}
                  className="rounded p-2"
                  actionType="cancel"
                  onClick={() => setDeleteId(null)}
                />
              </div>
            </div>
          </div>
        }
        onClose={() => {
          setDeleteHolder(null);
          setDeleteConfirmed(false);
        }}
      ></CustomModal>
    </>
  );
}
