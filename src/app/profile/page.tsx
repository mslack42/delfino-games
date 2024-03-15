import { auth } from "@/auth";
import { getUser } from "@/database/users/getUser";
import { redirect } from "next/navigation";
import { ProfileView } from "./ProfileView";
import { ProfileActions } from "./ProfileActions";
import { ProfileGameRequests } from "./ProfileGameRequests";
import { isNotRole } from "@/util/auth/server/isNotRole";
import { Conditional } from "@/components/common/Conditional";

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

  const canRequestGames = await isNotRole("Unverified");

  return (
    <>
      <div className="w-full max-w-lg">
        <ProfileView user={user} />
        <ProfileActions />
        <Conditional when={canRequestGames}>
          <ProfileGameRequests />
        </Conditional>
      </div>
    </>
  );
}
