"use client";
import { Conditional } from "@/components/common/Conditional";
import { useLoggedInInspection } from "@/util/auth/client/useLoggedInInspection";

type LoggedOutOnlyProps = {
  content: React.ReactNode;
};
export function LoggedOutOnly(props: LoggedOutOnlyProps) {
  const { isLoggedOut } = useLoggedInInspection();
  return <Conditional when={isLoggedOut()}>{props.content}</Conditional>;
}
