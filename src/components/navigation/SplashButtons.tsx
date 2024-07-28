import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { isLoggedIn } from "@/util/auth/server/isLoggedIn";
import { getRole } from "@/util/auth/server/getRole";
import { isAtLeast } from "@/security/isAtLeast";
import { Conditional } from "../common/Conditional";

export async function SplashButtons() {
  const loggedIn = await isLoggedIn();
  const role = await getRole();

  return (
    <div className="w-full p-4 flex flex-wrap justify-center gap-4">
      <SplashButton
        href={ApplicationRoutes.Games}
        text="Games"
        className="bg-red-300 hover:bg-red-200"
      />
      <Conditional when={loggedIn && isAtLeast(role, "Verified")}>
        <SplashButton
          href={ApplicationRoutes.GameRequests}
          text="Open Game Requests"
          className="bg-orange-300 hover:bg-orange-200"
        />
      </Conditional>
      <Conditional when={loggedIn}>
        <SplashButton
          href={ApplicationRoutes.Profile}
          text="Your Profile"
          className="bg-yellow-300 hover:bg-yellow-200"
        />
      </Conditional>
      <Conditional when={loggedIn && isAtLeast(role, "Holder")}>
        <SplashButton
          href={ApplicationRoutes.FindAndAddGame}
          text="Add A New Game"
          className="hover:bg-green-200 bg-green-300"
        />
      </Conditional>
      <Conditional when={loggedIn && isAtLeast(role, "Admin")}>
        <SplashButton
          href={ApplicationRoutes.Users}
          text="Manage Users"
          className="hover:bg-blue-200 bg-blue-300"
        />
      </Conditional>
      <Conditional when={loggedIn && isAtLeast(role, "Verified")}>
        <SplashButton
          href={ApplicationRoutes.SuggestGame}
          text="Suggest a game"
          className="hover:bg-pink-200 bg-pink-300"
        />
      </Conditional>
      <Conditional when={loggedIn && isAtLeast(role, "Verified")}>
        <SplashButton
          href={ApplicationRoutes.Vote}
          text="Vote on new games"
          className="hover:bg-purple-200 bg-purple-300"
        />
      </Conditional>
    </div>
  );
}
type SplashButtonProps = {
  className?: string;
  href: string;
  text: string;
};
function SplashButton(props: SplashButtonProps) {
  return (
    <Link href={props.href}>
      <div
        className={twMerge(
          "text-4xl rounded-lg p-6 text-center w-72 h-36 break-words flex flex-col justify-center",
          props.className
        )}
      >
        {props.text}
      </div>
    </Link>
  );
}
