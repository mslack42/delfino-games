import { ApplicationRoutes } from "@/constants/routes";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { isLoggedIn } from "@/util/auth/server/isLoggedIn";
import { getRole } from "@/util/auth/server/getRole";
import { isAtLeast } from "@/security/isAtLeast";

export async function SplashButtons() {
  const loggedIn = await isLoggedIn();
  const role = await getRole();

  return (
    <div className="w-full p-4 flex flex-wrap justify-center gap-4">
      <SplashButton
        href={ApplicationRoutes.Games}
        text="Games"
        className="bg-green-300 hover:bg-green-200"
      />
      {loggedIn && isAtLeast(role, "Verified") && (
        <SplashButton
          href={ApplicationRoutes.GameRequests}
          text="Open Game Requests"
          className="bg-blue-300 hover:bg-blue-200"
        />
      )}
      {loggedIn && (
        <SplashButton
          href={ApplicationRoutes.Profile}
          text="Your Profile"
          className="bg-purple-300 hover:bg-purple-200"
        />
      )}
      {loggedIn && isAtLeast(role, "Holder") && (
        <SplashButton
          href={ApplicationRoutes.FindAndAddGame}
          text="Add A New Game"
          className="hover:bg-yellow-200 bg-yellow-300"
        />
      )}
      {loggedIn && isAtLeast(role, "Admin") && (
        <SplashButton
          href={ApplicationRoutes.Users}
          text="Manage Users"
          className="hover:bg-red-200 bg-red-300"
        />
      )}
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
