import { auth } from "@/auth";

export async function isLoggedOut(): Promise<boolean> {
  const session = await auth();
  const user = session?.user;
  return !user && true;
}
