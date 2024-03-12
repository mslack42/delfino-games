import { CustomUser } from "@/auth";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";

type UserData = {
  name: string;
  id: string;
  email: string;
  role: UserRole;
} | null;

export const useUserData = () => {
  const { data: session } = useSession();

  let userData: UserData = null;

  if (session && session.user) {
    const user: CustomUser = session.user! as CustomUser;

    userData = {
      name: user.name!,
      id: user.id,
      email: user.email!,
      role: user.role! as UserRole,
    };
  }

  return {
    userData,
  };
};
