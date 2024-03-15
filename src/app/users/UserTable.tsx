"use client";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { Dispatch, SetStateAction, useState } from "react";
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
import { CustomModal } from "@/components/common/CustomModal";
import { Account, User } from "@prisma/client";
import { UserEditForm } from "./UserEditForm";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";
import { useRouter } from "next/navigation";
import { Conditional } from "@/components/common/Conditional";

type Props = {
  users: UserType[];
};
export type UserType = User & { accounts: Account[] };
export type UserModalProps = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

export function UserTable({ users }: Props) {
  const [deleteUser, setDeleteUser] = useState<UserType | null>(null);
  const [resetPasswordUser, setResetPasswordUser] = useState<UserType | null>(
    null
  );
  const [verifyUser, setVerifyUser] = useState<UserType | null>(null);
  const [editUser, setEditUser] = useState<UserType | null>(null);

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
                <TableCell className="p-2 break-words break-all">
                  {user.name}
                </TableCell>
                <TableCell className="p-2 break-words break-all">
                  {user.email}
                </TableCell>
                <TableCell className="p-2">{user.accounts[0].role}</TableCell>
                <TableCell className="p-2">
                  <ul className="flex space-x-2 justify-end">
                    {user.accounts[0].role === "Unverified" ? (
                      <li onClick={() => setVerifyUser(user)}>
                        <button onClick={() => setVerifyUser(user)}>
                          <CustomFontAwesomeIcon
                            icon={faCheck}
                            className="h-5"
                          />
                        </button>
                      </li>
                    ) : (
                      <li>
                        <button onClick={() => setEditUser(user)}>
                          <CustomFontAwesomeIcon
                            icon={faPenToSquare}
                            className="h-5"
                          />
                        </button>
                      </li>
                    )}
                    <li>
                      <button onClick={() => setDeleteUser(user)}>
                        <CustomFontAwesomeIcon icon={faTrash} className="h-5" />
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setResetPasswordUser(user)}>
                        <CustomFontAwesomeIcon
                          icon={faUnlock}
                          className="h-5"
                        />
                      </button>
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
      <EditUserModal user={editUser} setUser={setEditUser} />
    </>
  );
}

function EditUserModal({ user, setUser }: UserModalProps) {
  const router = useRouter();

  const changeMade = () => {
    setUser(null);
    router.refresh();
  };
  return (
    <>
      <CustomModal
        isOpen={!!user}
        title={<b>Edit {user?.name}</b>}
        onClose={() => {
          setUser(null);
        }}
      >
        <Conditional when={!!user}>
          <UserEditForm user={user!} onSubmitComplete={changeMade} />
        </Conditional>
      </CustomModal>
    </>
  );
}
