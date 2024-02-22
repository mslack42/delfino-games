import { auth } from "@/auth";

type RoleCheckProps = {
  type:"oneOf" | "noneOf",
  content: React.ReactNode;
  roles: string[]
}

export async function RoleCheck(props: RoleCheckProps) {
  const session = await auth();
  const user = session?.user;
  const role = (session?.user as any)?.role as string;

  let passesCheck
  if (role) {
    switch(props.type) {
      case "oneOf": {
        passesCheck = props.roles.includes(role)
        break;
      }
      case "noneOf": {
        passesCheck = !props.roles.includes(role)
        break;
      }
    }
  }

  return <>{user && passesCheck && props.content}</>;
}
