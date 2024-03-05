"use client";
import { useSession } from "next-auth/react";

type LoggedOutOnlyProps = {
  content: React.ReactNode;
};
export function LoggedOutOnly(props: LoggedOutOnlyProps) {
  const { status } = useSession();

  return <>{status === "unauthenticated" && props.content}</>;
}
