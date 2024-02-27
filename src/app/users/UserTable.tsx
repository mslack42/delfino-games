"use client";
import { CustomModal } from "@/components/common/CustomModal";
import { CustomButton } from "@/components/input/CustomButton";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

type Props = {
  users: UserType[];
};
type UserType = {
  id: string;
  name: string | null;
  email: string | null;
  accounts: { role: string }[];
};

export function UserTable({ users }: Props) {
  const [deleteUser, setDeleteUser] = useState<UserType | null>(null);
  const [resetPasswordUser, setResetPasswordUser] = useState<UserType | null>(
    null
  );

  return (
    <>
      <div className="rounded-lg">
        <table className="table-auto">
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
                      <li>
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
      <CustomModal
        isOpen={!!deleteUser}
        content={
          <div >
            <b>Are you sure you want to delete {deleteUser?.name}?</b>
            <p>This action is permanent.</p>
            <div className="flex flex-row justify-end w-full space-x-2">
              <CustomButton
                type="button"
                innerText={"Yes"}
                className="rounded p-2"
                onClick={() => setDeleteUser(null)}
              />
              <CustomButton
                type="button"
                innerText={"No"}
                className="rounded p-2"
                actionType="cancel"
                onClick={() => setDeleteUser(null)}
              />
            </div>
          </div>
        }
        onClose={() => {
          setDeleteUser(null);
        }}
      ></CustomModal>
      <CustomModal
        isOpen={!!resetPasswordUser}
        content={
          <div>
            <b>
              Are you sure you want to reset the password for{" "}
              {resetPasswordUser?.name}?
            </b>
            <div className="flex flex-row justify-end w-full space-x-2">
              <CustomButton
                type="button"
                innerText={"Yes"}
                className="rounded p-2"
                onClick={() => setResetPasswordUser(null)}
              />
              <CustomButton
                type="button"
                innerText={"No"}
                className="rounded p-2"
                actionType="cancel"
                onClick={() => setResetPasswordUser(null)}
              />
            </div>
          </div>
        }
        onClose={() => {
          setResetPasswordUser(null);
        }}
      ></CustomModal>
    </>
  );
}
