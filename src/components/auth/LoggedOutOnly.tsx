import { auth } from "@/auth";

type LoggedOutOnlyProps = {
  content: React.ReactNode;
};
export async function LoggedOutOnly(props: LoggedOutOnlyProps) {
  const session = await auth();
  const user = session?.user;

  console.log(user)

  return <>{!user && props.content}</>;
}
