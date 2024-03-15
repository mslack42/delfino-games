import { isLoggedIn } from "@/util/auth/server/isLoggedIn";

export async function LoggedInOnly(props: React.PropsWithChildren<{}>) {
  const loggedIn = await isLoggedIn();

  return <>{loggedIn && props.children}</>;
}
