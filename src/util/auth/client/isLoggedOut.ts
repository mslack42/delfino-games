import { useSession } from "next-auth/react";

export function isLoggedOut() {
  const { status } = useSession();
  return status === "unauthenticated";
}
