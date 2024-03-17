import { UserRole } from "@prisma/client";
import { rolesAndAbove } from "./rolesAndAbove";

export function passesPermissionsCheck(
  path: string,
  role: string | null | undefined
): boolean {
  const routeChecksHit = routeChecks.filter((rc) => {
    if (rc.pathMatchOverride) {
      return rc.pathMatchOverride(path);
    } else {
      return path.startsWith(rc.pathMatch);
    }
  });
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
  pathMatchOverride?: (s: string) => boolean;
  requiredRoles: UserRole[];
};

const routeChecks: RouteCheck[] = [
  { pathMatch: "/people", requiredRoles: rolesAndAbove("Admin") },
  { pathMatch: "/api/people", requiredRoles: rolesAndAbove("Admin") },
  { pathMatch: "/users", requiredRoles: rolesAndAbove("Admin") },
  { pathMatch: "/api/user", requiredRoles: rolesAndAbove("Admin") },
  { pathMatch: "/add-game", requiredRoles: rolesAndAbove("Holder") },
  { pathMatch: "/api/games", requiredRoles: rolesAndAbove("Holder") },
  { pathMatch: "/api/game", requiredRoles: rolesAndAbove("Holder") },
  { pathMatch: "/api/game", requiredRoles: rolesAndAbove("Holder") },
  { pathMatch: "/api/add-game", requiredRoles: rolesAndAbove("Holder") },
  {
    pathMatch: "/games/game/[id]/edit",
    requiredRoles: rolesAndAbove("Holder"),
    pathMatchOverride: (p: string) => {
      const regex = new RegExp(`\/games\/game\/\d+\/edit`);
      return regex.test(p);
    },
  },
  { pathMatch: "/api/request", requiredRoles: rolesAndAbove("Verified") },
  { pathMatch: "/games/holder", requiredRoles: rolesAndAbove("Verified") },
  { pathMatch: "/games/gameholders", requiredRoles: rolesAndAbove("Verified") },
  { pathMatch: "/profile", requiredRoles: rolesAndAbove("Unverified") },
  { pathMatch: "/api/profile", requiredRoles: rolesAndAbove("Unverified") },
];
