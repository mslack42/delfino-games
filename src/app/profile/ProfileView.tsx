import { KeyValue } from "@/components/common/KeyValue";
import { Account, User } from "@prisma/client";

type ViewProps = {
  user: User & { accounts: Account[] };
};
export function ProfileView({ user }: ViewProps) {
  "use client";
  return (
    <div className="p-4">
      <h1 className="text-4xl">Profile</h1>
      <div className="p-2 flex flex-col">
        <KeyValue
          dataKey={"Name"}
          dataValue={<div>{user.name}</div>}
          className="flex flex-row space-x-2 justify-between"
        />
        <KeyValue
          dataKey={"Email"}
          dataValue={<div>{user.email}</div>}
          className="flex flex-row space-x-2 justify-between"
        />
        <KeyValue
          dataKey={"Role"}
          dataValue={<div>{user.accounts[0].role}</div>}
          className="flex flex-row space-x-2 justify-between"
        />
      </div>
    </div>
  );
}
