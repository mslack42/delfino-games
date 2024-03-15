import { auth } from "@/auth";
import { isRole } from "@/util/auth/server/isRole";
import { isNotRole } from "@/util/auth/server/isNotRole";
import { UserRole } from "@prisma/client";

type RoleCheckProps = {
  type: "oneOf" | "noneOf";
  roles: UserRole[];
};

export async function RoleCheck(
  props: React.PropsWithChildren<RoleCheckProps>
) {
  const session = await auth();
  const user = session?.user;

  let passesCheck =
    props.type === "oneOf"
      ? await isRole(...props.roles)
      : await isNotRole(...props.roles);

  const display = user && passesCheck;

  return <>{display && props.children}</>;
}
