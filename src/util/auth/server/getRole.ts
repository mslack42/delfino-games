import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export async function getRole(): Promise<UserRole> {
  const session = await auth();
  const user = session?.user;
  const role = (user as any)?.role as UserRole;
  return role;
}
