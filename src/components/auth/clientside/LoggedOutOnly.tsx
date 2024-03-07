"use client";
import { useLoggedInInspection } from "@/util/auth/client/useLoggedInInspection";

type LoggedOutOnlyProps = {
  content: React.ReactNode;
};
export function LoggedOutOnly(props: LoggedOutOnlyProps) {
  const { isLoggedOut } = useLoggedInInspection();
  return <>{isLoggedOut() && props.content}</>;
}
