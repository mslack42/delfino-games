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
        <table className="table-auto rounded-sm">
          <tbody className="rounded-lg">
            <tr className="bg-teal-300 p-1">
              <th className="p-1">Name</th>
              <th className="p-1">Email</th>
              <th className="p-1">Role</th>
              <th className="p-1">Actions</th>
            </tr>
            {users.map((user: UserType) => (
              <tr key={user.id} className="bg-cyan-100 even:bg-cyan-200">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.accounts[0].role}</td>
                <td className="p-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
