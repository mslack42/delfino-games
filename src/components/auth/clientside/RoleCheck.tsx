"use client";
import { CustomUser } from "@/auth";
import { Conditional } from "@/components/common/Conditional";
import { useUserRoleInspection } from "@/util/auth/client/useUserRoleInspection";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";

type RoleCheckProps = {
  type: "oneOf" | "noneOf";
  roles: UserRole[];
};

export function RoleCheck(props: React.PropsWithChildren<RoleCheckProps>) {
  const { data: session } = useSession();
  const { isRole, isNotRole } = useUserRoleInspection();

  if (!session || !session.user) {
    return <></>;
  }
  const user: CustomUser = session.user! as CustomUser;

  let passesCheck =
    props.type === "oneOf" ? isRole(...props.roles) : isNotRole(...props.roles);

  return (
    <Conditional when={!!user && passesCheck}>{props.children}</Conditional>
  );
}
