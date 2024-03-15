"use client";
import { Conditional } from "@/components/common/Conditional";
import { useLoggedInInspection } from "@/util/auth/client/useLoggedInInspection";

type LoggedInOnlyProps = {
  content: React.ReactNode;
};
export function LoggedInOnly(props: LoggedInOnlyProps) {
  const { isLoggedIn } = useLoggedInInspection();
  return <Conditional when={isLoggedIn()}>{props.content}</Conditional>;
}
