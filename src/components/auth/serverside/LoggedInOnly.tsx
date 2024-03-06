import { isLoggedIn } from "@/util/auth/server/isLoggedIn";

type LoggedInOnlyProps = {
  content: React.ReactNode;
};
export async function LoggedInOnly(props: LoggedInOnlyProps) {
  const loggedIn = await isLoggedIn();

  return <>{loggedIn && props.content}</>;
}
