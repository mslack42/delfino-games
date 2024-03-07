import { useSession } from "next-auth/react";

export const useLoggedInInspection = () => {
  const { status } = useSession();

  function isLoggedIn() {
    return status === "authenticated";
  }

  function isLoggedOut() {
    return status === "unauthenticated";
  }

  return { isLoggedIn, isLoggedOut };
};
