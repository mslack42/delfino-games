import { UserRole } from "@prisma/client";
import { rolesAndAbove } from "./rolesAndAbove";

type RouteCheck = {
  pathMatch: string;
  pathMatchOverride?: (s: string) => boolean;
  requiredRoles: UserRole[];
};
export const routeChecks: RouteCheck[] = [
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
  { pathMatch: "/games/company", requiredRoles: rolesAndAbove("Verified") },
  { pathMatch: "/profile", requiredRoles: rolesAndAbove("Unverified") },
  { pathMatch: "/api/profile", requiredRoles: rolesAndAbove("Unverified") },
  { pathMatch: "/suggest-game", requiredRoles: rolesAndAbove("Verified") },
  { pathMatch: "/vote", requiredRoles: rolesAndAbove("Verified") },
  { pathMatch: "/site-admin", requiredRoles: rolesAndAbove("Admin") },
];
