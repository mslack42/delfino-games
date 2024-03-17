import { UserRole } from "@prisma/client";
import { routeChecks } from "./routeChecks";

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
