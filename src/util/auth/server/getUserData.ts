import { CustomUser, auth } from "@/auth";

export async function getUserData() {
  const session = await auth();
  const user = session?.user as CustomUser;

  return user;
}
