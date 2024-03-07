import { LoggedInOnly } from "../auth/serverside/LoggedInOnly";
import { LoggedOutOnly } from "../auth/serverside/LoggedOutOnly";
import { RoleCheck } from "../auth/serverside/RoleCheck";
import { DropDown, DropDownGroupCollection } from "../input/DropDown";
import { Logo } from "./Logo";
import { gamesCollection } from "./loggedIn/gamesCollection";
import { adminControls } from "./loggedIn/adminControls";
import { profileControls } from "./loggedIn/profileControls";
import { BurgerButton } from "./BurgerButton";
import { loggedOutMenuItems } from "./loggedOut/loggedOutMenuItems";

export const NavigationBar = async () => {
  const menu: DropDownGroupCollection = {
    game: await gamesCollection(),
    admin: await adminControls(),
    profile: await profileControls(),
  };
  return (
    <div className="w-full h-16 bg-teal-600 sticky top-0  z-[500]">
      <div className="bg-teal-600 h-full">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full align-middle">
            <Logo />
            <div className="hidden md:flex justify-end flex-col h-full pb-3 z-[501]">
              <ul className="flex text-white divide-solid divide-x-2">
                <LoggedInOnly
                  content={
                    <>
                      <li className="px-2">
                        <DropDown type="Single" {...menu["game"]} />
                      </li>
                      <RoleCheck
                        type="oneOf"
                        roles={["Admin"]}
                        content={
                          <li className="px-2">
                            <DropDown type="Single" {...menu["admin"]} />
                          </li>
                        }
                      ></RoleCheck>
                      <li className="px-2">
                        <DropDown type="Single" {...menu["profile"]} />
                      </li>
                    </>
                  }
                />
                <LoggedOutOnly
                  content={
                    <>
                      {loggedOutMenuItems().map((it, i) => (
                        <div className="px-2" key={i}>
                          {it}
                        </div>
                      ))}
                    </>
                  }
                />
              </ul>
            </div>
            <div className="flex md:hidden justify-end flex-col h-full pb-3 z-[501]">
              <LoggedInOnly
                content={
                  <DropDown
                    type="Multi"
                    head={<BurgerButton />}
                    items={[menu["game"], menu["admin"], menu["profile"]]}
                  />
                }
              />
              <LoggedOutOnly
                content={
                  <DropDown
                    type="Single"
                    head={<BurgerButton />}
                    items={loggedOutMenuItems()}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
