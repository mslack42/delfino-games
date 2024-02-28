"use client"
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type HolderType = {
  id: number;
  name: string | null;
};
type Props = {
  holders: HolderType[];
};
export function PeopleTable({ holders }: Props) {
  const [deleteHolder, setDeleteHolder] = useState<HolderType | null>(null);
  const router = useRouter()

  const deleteHandler = async (holderId: number | undefined | null) => {
    if (holderId) {
      await fetch(`/api/people?id=${holderId}`,{method:"DELETE"})
      setDeleteHolder(null)
      router.refresh()
    }
  }

  return (<>
    <div className="rounded-lg">
      <table className="table-auto">
        <tbody className="rounded-lg">
          <tr className="bg-teal-300 p-1">
            <th className="p-1">Name</th>
            <th className="p-1">Office</th>
            <th className="p-1">Actions</th>
          </tr>
          {holders.map((holder) => (
            <tr key={holder.id} className="bg-cyan-100 even:bg-cyan-200">
              <td className="p-2">{holder.name}</td>
              <td className="p-2">(TBD, but probably Poole)</td>
              <td className="p-2">
                <ul className="flex space-x-2">
                  <li>
                    <Link
                      href={`/games/holder/${holder.name}`}
                      className="text-center"
                    >
                      <FontAwesomeIcon icon={faDice} className="h-5" />
                    </Link>
                  </li>
                  <li>
                    <Link href={`/people/${holder.id}`}>
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
          content={
            <div>
              <b>Are you sure you want to delete {deleteHolder?.name}?</b>
              <p>This action is permanent.</p>
              <div className="flex flex-row justify-end w-full space-x-2">
              <CustomButton
                type="button"
                innerText={"Yes"}
                className="rounded p-2"
                onClick={() => deleteHandler(deleteHolder?.id)}
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
          }
          onClose={() => {
            setDeleteHolder(null);
          }}
        ></CustomModal></>
  );
}
