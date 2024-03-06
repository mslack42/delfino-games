"use client";
import { CustomUser } from "@/auth";
import { isNotRole } from "@/util/auth/client/isNotRole";
import { isRole } from "@/util/auth/client/isRole";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";

type RoleCheckProps = {
  type: "oneOf" | "noneOf";
  content: React.ReactNode;
  roles: UserRole[];
};

export function RoleCheck(props: RoleCheckProps) {
  const { data: session } = useSession();
  if (!session || !session.user) {
    return <></>;
  }
  const user: CustomUser = session.user! as CustomUser;

  let passesCheck =
    props.type === "oneOf" ? isRole(...props.roles) : isNotRole(...props.roles);

  return <>{user && passesCheck && props.content}</>;
}
