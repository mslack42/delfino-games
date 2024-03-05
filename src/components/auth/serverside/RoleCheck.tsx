import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

type RoleCheckProps = {
  type: "oneOf" | "noneOf";
  content: React.ReactNode;
  elseContent?: React.ReactNode;
  roles: UserRole[];
};

export async function RoleCheck(props: RoleCheckProps) {
  const session = await auth();
  const user = session?.user;
  const role = (session?.user as any)?.role as string;

  let passesCheck;
  if (role) {
    switch (props.type) {
      case "oneOf": {
        passesCheck = props.roles.includes(role as UserRole);
        break;
      }
      case "noneOf": {
        passesCheck = !props.roles.includes(role as UserRole);
        break;
      }
    }
  }
  const display = user && passesCheck;

  return (
    <>
      {display && props.content}
      {!display && props.elseContent}
    </>
  );
}
