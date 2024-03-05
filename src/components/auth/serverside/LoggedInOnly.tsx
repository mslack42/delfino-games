import { auth } from "@/auth";

type LoggedInOnlyProps = {
  content: React.ReactNode;
};
export async function LoggedInOnly(props: LoggedInOnlyProps) {
  const session = await auth();
  const user = session?.user;

  return <>{user && props.content}</>;
}
