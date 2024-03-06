import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export async function isNotRole(...roles: UserRole[]): Promise<boolean> {
  const session = await auth();
  const user = session?.user;
  const role = (user as any)?.role as string;

  return !roles.includes(role as UserRole);
}
