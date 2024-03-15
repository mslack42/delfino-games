import { Conditional } from "@/components/common/Conditional";
import { isLoggedOut } from "@/util/auth/server/isLoggedOut";

export async function LoggedOutOnly(props: React.PropsWithChildren<{}>) {
  const loggedOut = await isLoggedOut();
  return <Conditional when={loggedOut}>{props.children}</Conditional>;
}
