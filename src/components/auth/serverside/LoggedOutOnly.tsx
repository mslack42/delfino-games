import { auth } from "@/auth";

type LoggedOutOnlyProps = {
  content: React.ReactNode;
};
export async function LoggedOutOnly(props: LoggedOutOnlyProps) {
  const session = await auth();
  const user = session?.user;

  return <>{!user && props.content}</>;
}
