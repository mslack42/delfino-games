"use client";
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";
import { ApiRoutes, ApplicationRoutes } from "@/constants/routes";
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Location } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type HolderType = {
  id: number;
  name: string | null;
  location: Location;
};
type Props = {
  holders: HolderType[];
};
export function PeopleTable({ holders }: Props) {
  const [deleteHolder, setDeleteHolder] = useState<HolderType | null>(null);
  const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);
  const router = useRouter();

  const deleteHandler = async (holderId: number | undefined | null) => {
    if (holderId) {
      await fetch(ApiRoutes.DeletePerson(holderId!), { method: "DELETE" });
      setDeleteHolder(null);
      router.refresh();
    }
  };

  return (
    <>
      <div className="rounded-lg flex flex-row justify-center">
        <table className="table-auto">
          <tbody className="rounded-lg">
            <tr className="bg-headbar p-1 text-white">
              <th className="p-1">Name</th>
              <th className="p-1">Office</th>
              <th className="p-1">Actions</th>
            </tr>
            {holders.map((holder) => (
              <tr key={holder.id} className="bg-teal-100 even:bg-teal-200">
                <td className="p-2">{holder.name}</td>
                <td className="p-2">{holder.location as string}</td>
                <td className="p-2">
                  <ul className="flex space-x-2">
                    <li>
                      <Link
                        href={ApplicationRoutes.PersonsGames(holder.name!)}
                        className="text-center"
                      >
                        <FontAwesomeIcon icon={faDice} className="h-5" />
                      </Link>
                    </li>
                    <li>
                      <Link href={ApplicationRoutes.EditPerson(holder.id)}>
                        <FontAwesomeIcon icon={faPenToSquare} className="h-5" />
                      </Link>
                    </li>
                    <li onClick={() => setDeleteHolder(holder)}>
                      <FontAwesomeIcon icon={faTrash} className="h-5" />
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomModal
        isOpen={!!deleteHolder}
        title={<b>Are you sure you want to delete {deleteHolder?.name}?</b>}
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
                  onClick={() => deleteHandler(deleteHolder?.id)}
                  disabled={!deleteConfirmed}
                />
                <CustomButton
                  type="button"
                  innerText={"No"}
                  className="rounded p-2"
                  actionType="cancel"
                  onClick={() => setDeleteHolder(null)}
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
