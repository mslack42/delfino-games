import { auth } from "@/auth";
import { getUser } from "@/database/users/getUser";
import { redirect } from "next/navigation";
import { ProfileView } from "./ProfileView";
import { ProfileActions } from "./ProfileActions";

export default async function Profile() {
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
    <>
      <div>
        <ProfileView user={user} />
        <ProfileActions />
      </div>
    </>
  );
}
