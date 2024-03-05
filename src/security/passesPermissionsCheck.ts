import { UserRole } from "@prisma/client";

export function passesPermissionsCheck(
  path: string,
  role: string | null | undefined
): boolean {
  const routeChecksHit = routeChecks.filter((rc) =>
    path.startsWith(rc.pathMatch)
  );
  if (routeChecksHit.length === 0) {
    return true;
  }
  if (!role) {
    return false;
  }

  return routeChecksHit.every((rc) =>
    rc.requiredRoles.includes(role as UserRole)
  );
}

type RouteCheck = {
  pathMatch: string;
  requiredRoles: UserRole[];
};

function atLeast(role: UserRole): UserRole[] {
  switch (role) {
    case "Admin": {
      return ["Admin"];
    }
    case "Holder": {
      return ["Holder", ...atLeast("Admin")];
    }
    case "Verified": {
      return ["Verified", ...atLeast("Holder")];
    }
    case "Unverified": {
      return ["Unverified", ...atLeast("Verified")];
    }
  }
}

const routeChecks: RouteCheck[] = [
  { pathMatch: "/people", requiredRoles: atLeast("Admin") },
  { pathMatch: "/api/people", requiredRoles: atLeast("Admin") },
  { pathMatch: "/users", requiredRoles: atLeast("Admin") },
  { pathMatch: "/api/user", requiredRoles: atLeast("Admin") },
  { pathMatch: "/add-game", requiredRoles: atLeast("Holder") },
  { pathMatch: "/api/games", requiredRoles: atLeast("Holder") },
  { pathMatch: "/api/add-game", requiredRoles: atLeast("Holder") },
  { pathMatch: "/games/holder", requiredRoles: atLeast("Unverified") },
  { pathMatch: "/profile", requiredRoles: atLeast("Unverified") },
  { pathMatch: "/api/profile", requiredRoles: atLeast("Unverified") },
];
