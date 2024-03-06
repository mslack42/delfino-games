"use client";
import { isLoggedIn } from "@/util/auth/client/isLoggedIn";

type LoggedInOnlyProps = {
  content: React.ReactNode;
};
export function LoggedInOnly(props: LoggedInOnlyProps) {
  return <>{isLoggedIn() && props.content}</>;
}
