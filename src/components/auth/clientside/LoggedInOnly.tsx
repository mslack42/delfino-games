"use client";
import { useLoggedInInspection } from "@/util/auth/client/useLoggedInInspection";

type LoggedInOnlyProps = {
  content: React.ReactNode;
};
export function LoggedInOnly(props: LoggedInOnlyProps) {
  const { isLoggedIn } = useLoggedInInspection();
  return <>{isLoggedIn() && props.content}</>;
}
