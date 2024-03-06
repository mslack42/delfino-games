import { isLoggedOut } from "@/util/auth/server/isLoggedOut";

type LoggedOutOnlyProps = {
  content: React.ReactNode;
};
export async function LoggedOutOnly(props: LoggedOutOnlyProps) {
  const loggedOut = await isLoggedOut();
  return <>{loggedOut && props.content}</>;
}
