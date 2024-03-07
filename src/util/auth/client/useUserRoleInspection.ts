import { CustomUser } from "@/auth";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";

export const useUserRoleInspection = () => {
  const { data: session } = useSession();

  function isRole(...roles: UserRole[]) {
    if (!session || !session.user) {
      return false;
    }
    const user: CustomUser = session.user! as CustomUser;
    const role = user.role;

    return roles.includes(role as UserRole);
  }

  function isNotRole(...roles: UserRole[]) {
    if (!session || !session.user) {
      return false;
    }
    const user: CustomUser = session.user! as CustomUser;
    const role = user.role;

    return !roles.includes(role as UserRole);
  }

  return { isRole, isNotRole };
};
