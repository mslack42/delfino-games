import { BggDataSummary } from "@/components/data-display/BggDataSummary";
import { getInventoryItem } from "@/database/games/getGame";
import { createBggDataSummaryFromInventoryItem } from "@/util/data-conversion";
import { DsDataSummary } from "./DsDataSummary";

import { GameActionButtons } from "./GameActionButtons";
import { RoleCheck } from "@/components/auth/serverside/RoleCheck";
import { isLoggedIn } from "@/util/auth/server/isLoggedIn";

type Props = {
  params: {
    gameId: string;
  };
};

export default async function GamePage(props: Props) {
  const data = await getInventoryItem(Number.parseInt(props.params.gameId));
  const loggedIn = await isLoggedIn();

  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 ">
          <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg">
            <BggDataSummary
              data={createBggDataSummaryFromInventoryItem(data)}
            ></BggDataSummary>
          </div>
        </div>
        <div className="w-full md:w-1/2 ">
          <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg">
            <DsDataSummary
              data={data.dsData}
              fullDetails={loggedIn}
            ></DsDataSummary>
          </div>
          <RoleCheck type={"oneOf"} roles={["Admin", "Holder"]}>
            <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg">
              <GameActionButtons id={data.id} />
            </div>
          </RoleCheck>
        </div>
      </div>
    </div>
  );
}
