"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ShadcnTable";
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import Link from "next/link";
import { DeleteHolderModal } from "./DeleteHolderModal";
import { ApplicationRoutes } from "@/constants/routes";
import { useState } from "react";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";
import { EditHolderModal } from "./EditHolderModal";
import { Person } from "@prisma/client";

type Props = {
  holders: Person[];
};
export function PeopleTable({ holders }: Props) {
  const [deleteHolder, setDeleteHolder] = useState<Person | null>(null);
  const [editHolder, setEditHolder] = useState<Person | null>(null);

  return (
    <>
      <div className="rounded-lg flex flex-row justify-center">
        <Table className="table-auto">
          <TableHeader className="bg-headbar text-white text-center">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Office</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holders.map((holder) => (
              <TableRow
                key={holder.id}
                className="bg-teal-100 even:bg-teal-200"
              >
                <TableCell className="p-2">{holder.name}</TableCell>
                <TableCell className="p-2">
                  {holder.location as string}
                </TableCell>
                <TableCell className="p-2">
                  <ul className="flex space-x-2 justify-center">
                    <li>
                      <Link
                        href={ApplicationRoutes.PersonsGames(holder.name!)}
                        className="text-center"
                      >
                        <CustomFontAwesomeIcon icon={faDice} className="h-5" />
                      </Link>
                    </li>
                    <li>
                      <button onClick={() => setEditHolder(holder)}>
                        <CustomFontAwesomeIcon
                          icon={faPenToSquare}
                          className="h-5"
                        />
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setDeleteHolder(holder)}>
                        <CustomFontAwesomeIcon icon={faTrash} className="h-5" />
                      </button>
                    </li>
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DeleteHolderModal
        holder={deleteHolder}
        onClose={() => setDeleteHolder(null)}
      />
      <EditHolderModal
        holder={editHolder}
        onClose={() => setEditHolder(null)}
      />
    </>
  );
}
