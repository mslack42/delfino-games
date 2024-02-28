export function passesPermissionsCheck(
  path: string,
  role: string | null | undefined
): boolean {
  const paths = ["/add-game", "/people"];

  const routeChecksHit = routeChecks.filter(rc => path.startsWith(rc.pathMatch))

  if (routeChecksHit.length === 0) {
    return true
  }
  if (!role) {
    return false
  }

  return routeChecksHit.every(rc => rc.requiredRoles.includes(role as Role));
}
type Role = "Admin" | "Verified" | "Unverified"

type RouteCheck = {
  pathMatch: string;
  requiredRoles: Role[];
};

const routeChecks: RouteCheck[] = [
  { pathMatch: "add-game", requiredRoles: ["Admin"] },
  { pathMatch: "people", requiredRoles: ["Admin"] },
  { pathMatch: "users", requiredRoles: ["Admin"] },
  { pathMatch: "api/people", requiredRoles: ["Admin"] },
  { pathMatch: "profile", requiredRoles: ["Admin","Verified","Unverified"] },
];
