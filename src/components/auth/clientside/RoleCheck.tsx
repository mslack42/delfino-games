"use client";
import { CustomUser } from "@/auth";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";

type RoleCheckProps = {
  type: "oneOf" | "noneOf";
  content: React.ReactNode;
  roles: UserRole[];
};

export function RoleCheck(props: RoleCheckProps) {
  const { data: session, status } = useSession();
  if (!session || !session.user) {
    return <></>;
  }
  const user: CustomUser = session.user! as CustomUser;
  const role = user.role;

  let passesCheck;
  if (role) {
    switch (props.type) {
      case "oneOf": {
        passesCheck = props.roles.includes(role as UserRole);
        break;
      }
      case "noneOf": {
        passesCheck = !props.roles.includes(role as UserRole);
        break;
      }
    }
  }

  return <>{user && passesCheck && props.content}</>;
}
