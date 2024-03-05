"use client";
import { useSession } from "next-auth/react";

type LoggedInOnlyProps = {
  content: React.ReactNode;
};
export function LoggedInOnly(props: LoggedInOnlyProps) {
  const { status } = useSession();

  return <>{status === "authenticated" && props.content}</>;
}
