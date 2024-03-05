import Link from "next/link";
import { ApplicationRoutes } from "@/constants/routes";

export function loggedOutMenuItems(): React.ReactNode[] {
  return [
    <Link href={ApplicationRoutes.Games} className="h-full w-full" key={1}>
      Games Collection
    </Link>,
    <Link href={ApplicationRoutes.LogIn} className="h-full w-full" key={2}>
      Log In
    </Link>,
  ];
}
