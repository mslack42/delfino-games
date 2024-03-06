import { CustomUser } from "@/auth";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";

export function isNotRole(...roles: UserRole[]) {
  const { data: session } = useSession();
  if (!session || !session.user) {
    return false;
  }
  const user: CustomUser = session.user! as CustomUser;
  const role = user.role;

  return !roles.includes(role as UserRole);
}
