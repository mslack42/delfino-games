"use client";
import { isLoggedOut } from "@/util/auth/client/isLoggedOut";

type LoggedOutOnlyProps = {
  content: React.ReactNode;
};
export function LoggedOutOnly(props: LoggedOutOnlyProps) {
  return <>{isLoggedOut() && props.content}</>;
}
