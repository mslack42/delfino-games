import { LoggedInOnly } from "../auth/serverside/LoggedInOnly";
import { LoggedOutOnly } from "../auth/serverside/LoggedOutOnly";
import { DropDown, DropDownGroupCollection } from "../input/DropDown";
import { Logo } from "./Logo";
import { gamesCollection } from "./loggedIn/gamesCollection";
import { adminControls } from "./loggedIn/adminControls";
import { profileControls } from "./loggedIn/profileControls";
import { BurgerButton } from "./BurgerButton";
import { loggedOutMenuItems } from "./loggedOut/loggedOutMenuItems";
import { signOut } from "@/auth";
import { isLoggedIn } from "@/util/auth/server/isLoggedIn";
import { isRole } from "@/util/auth/server/isRole";

export const NavigationBar = async () => {
  const logoutAction = async () => {
    "use server";
    await signOut();
  };
  const loggedIn = await isLoggedIn();
  const isAdmin = await isRole("Admin");
  let menu: DropDownGroupCollection = {
    game: await gamesCollection(),
    profile: await profileControls(logoutAction),
  };
  let menuList = [menu["game"], menu["profile"]];
  if (loggedIn && isAdmin) {
    menu["admin"] = await adminControls();
    menuList = [menu["game"], menu["admin"], menu["profile"]];
  }
  return (
    <div className="w-full h-16 bg-teal-700 sticky top-0  z-[500]">
      <div className="bg-teal-700 h-full">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full align-middle">
            <Logo />
            <div className="hidden md:flex justify-end flex-col h-full pb-3 z-[501]">
              <ul className="flex text-white divide-solid divide-x-2">
                <LoggedInOnly>
                  {menuList.map((ml, mlk) => (
                    <li className="px-2" key={mlk}>
                      <DropDown type="Single" {...ml} name={ml.name!} />
                    </li>
                  ))}
                </LoggedInOnly>
                <LoggedOutOnly>
                  {loggedOutMenuItems().map((it, i) => (
                    <div className="px-2" key={i}>
                      {it}
                    </div>
                  ))}
                </LoggedOutOnly>
              </ul>
            </div>
            <div className="flex md:hidden justify-end flex-col h-full pb-3 z-[501]">
              <LoggedInOnly>
                <DropDown
                  type="Multi"
                  name="Menu"
                  head={<BurgerButton />}
                  items={menuList}
                />
              </LoggedInOnly>
              <LoggedOutOnly>
                <DropDown
                  type="Single"
                  name="Menu"
                  head={<BurgerButton />}
                  items={loggedOutMenuItems()}
                />
              </LoggedOutOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
