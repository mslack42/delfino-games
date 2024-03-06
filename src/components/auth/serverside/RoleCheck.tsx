import { auth } from "@/auth";
import { isRole } from "@/util/auth/server/isRole";
import { isNotRole } from "@/util/auth/server/isNotRole";
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

  let passesCheck =
    props.type === "oneOf"
      ? await isRole(...props.roles)
      : await isNotRole(...props.roles);

  const display = user && passesCheck;

  return (
    <>
      {display && props.content}
      {!display && props.elseContent}
    </>
  );
}
