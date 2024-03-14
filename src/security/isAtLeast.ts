import { UserRole } from "@prisma/client";
import { rolesAndAbove } from "./rolesAndAbove";

export function isAtLeast(currRole: UserRole, targetRole: UserRole) {
  return rolesAndAbove(targetRole).includes(currRole);
}
