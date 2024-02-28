import { Account, User } from "@prisma/client";

type ViewProps = {
    user: User & { accounts: Account[]; };
};
export function ProfileView({ user }: ViewProps) {
    "use client";
    return <>
        <div>{user.name}</div>
        <div>{user.email}</div>
        <div>{user.accounts[0].role}</div>
    </>;
}
