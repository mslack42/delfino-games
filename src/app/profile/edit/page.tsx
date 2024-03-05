import { auth } from "@/auth";
import { getUser } from "@/database/users/getUser";
import { redirect } from "next/navigation";
import { ProfileEdit } from "./ProfileEdit";

export default async function ProfileEditPage() {
  const session = await auth();
  const tokenUser = session?.user;

  if (!tokenUser) {
    redirect("/");
  }

  const user = await getUser(tokenUser?.id!);

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <ProfileEdit user={user} />
    </div>
  );
}
