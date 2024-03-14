import { UserRole } from "@prisma/client";

export function rolesAndAbove(role: UserRole): UserRole[] {
  switch (role) {
    case "Admin": {
      return ["Admin"];
    }
    case "Holder": {
      return ["Holder", ...rolesAndAbove("Admin")];
    }
    case "Verified": {
      return ["Verified", ...rolesAndAbove("Holder")];
    }
    case "Unverified": {
      return ["Unverified", ...rolesAndAbove("Verified")];
    }
  }
}
