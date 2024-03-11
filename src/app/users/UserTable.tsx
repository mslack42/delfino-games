"use client";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import { VerifyUserModal } from "./VerifyUserModal";
import { PasswordResetModal } from "./PasswordResetModal";
import { DeleteUserModal } from "./DeleteUserModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ShadcnTable";

type Props = {
  users: UserType[];
};
export type UserType = {
  id: string;
  name: string | null;
  email: string | null;
  accounts: { role: string }[];
};
export type UserModalProps = {
  user: UserType | null;
  setUser: (v: SetStateAction<UserType | null>) => void;
};

export function UserTable({ users }: Props) {
  const [deleteUser, setDeleteUser] = useState<UserType | null>(null);
  const [resetPasswordUser, setResetPasswordUser] = useState<UserType | null>(
    null
  );
  const [verifyUser, setVerifyUser] = useState<UserType | null>(null);

  return (
    <>
      <div className="rounded-lg flex flex-row justify-center">
        <Table className="table-auto rounded-sm">
          <TableHeader className="bg-headbar text-white">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: UserType) => (
              <TableRow key={user.id} className="bg-teal-100 even:bg-teal-200">
                <TableCell className="p-2">{user.name}</TableCell>
                <TableCell className="p-2">{user.email}</TableCell>
                <TableCell className="p-2">{user.accounts[0].role}</TableCell>
                <TableCell className="p-2">
                  <ul className="flex space-x-2 justify-end">
                    {user.accounts[0].role === "Unverified" ? (
                      <li onClick={() => setVerifyUser(user)}>
                        <FontAwesomeIcon icon={faCheck} className="h-5" />
                      </li>
                    ) : (
                      <li>
                        <Link
                          href={`/users/${user.id}`}
                          className="text-center"
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="h-5"
                          />
                        </Link>
                      </li>
                    )}
                    <li onClick={() => setDeleteUser(user)}>
                      <FontAwesomeIcon icon={faTrash} className="h-5" />
                    </li>
                    <li onClick={() => setResetPasswordUser(user)}>
                      <FontAwesomeIcon icon={faUnlock} className="h-5" />
                    </li>
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DeleteUserModal user={deleteUser} setUser={setDeleteUser} />
      <PasswordResetModal
        user={resetPasswordUser}
        setUser={setResetPasswordUser}
      />
      <VerifyUserModal user={verifyUser} setUser={setVerifyUser} />
    </>
  );
}
