import { useSession } from "next-auth/react";

export function isLoggedIn() {
  const { status } = useSession();
  return status === "authenticated";
}
