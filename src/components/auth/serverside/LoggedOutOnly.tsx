import { isLoggedOut } from "@/util/auth/server/isLoggedOut";

export async function LoggedOutOnly(props: React.PropsWithChildren<{}>) {
  const loggedOut = await isLoggedOut();
  return <>{loggedOut && props.children}</>;
}
