import { Conditional } from "@/components/common/Conditional";
import { isLoggedIn } from "@/util/auth/server/isLoggedIn";

export async function LoggedInOnly(props: React.PropsWithChildren<{}>) {
  const loggedIn = await isLoggedIn();

  return <Conditional when={loggedIn}>{props.children}</Conditional>;
}
