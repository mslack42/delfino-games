import { auth } from "@/auth";
import { getUser } from "@/database/users/getUser";
import { redirect } from "next/navigation";
import { ProfileView } from "./ProfileView";
import { ProfileActions } from "./ProfileActions";
import { ProfileGameRequests } from "./ProfileGameRequests";
import { isNotRole } from "@/util/auth/server/isNotRole";
import { Conditional } from "@/components/common/Conditional";
import { ProfileGameSuggestionsAndVotes } from "./ProfileGameSuggestions";

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

  const isVerified = await isNotRole("Unverified");

  return (
    <>
      <div className="w-full max-w-xl">
        <ProfileView user={user} />
        <ProfileActions />
        <Conditional when={isVerified}>
          <ProfileGameRequests />
          <ProfileGameSuggestionsAndVotes />
        </Conditional>
      </div>
    </>
  );
}
