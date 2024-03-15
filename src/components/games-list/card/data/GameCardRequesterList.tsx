import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { PanelProps } from "../InventoryItemPanel";
import { GameRequestsContext } from "@/components/game-requests/GameRequestContext";
import { Tag } from "@/components/common/Tag";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";
import { useLoggedInInspection } from "@/util/auth/client/useLoggedInInspection";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { useToast } from "@/components/shadcn/use-toast";
import { useUserRoleInspection } from "@/util/auth/client/useUserRoleInspection";
import { Conditional } from "@/components/common/Conditional";

export function GameCardRequesterList(props: PanelProps) {
  const { data } = props;
  const gameId = data.id;
  const { toast } = useToast();
  const { allRequests, setAllRequests } = useContext(GameRequestsContext);
  const requesters = allRequests.filter((r) => r.game.id === data.id);

  const { isLoggedOut } = useLoggedInInspection();
  const { isRole } = useUserRoleInspection();
  if (isLoggedOut()) {
    return (
      <div className="w-full flex flex-row justify-start text-left px-2">
        {requesters.length.toString()} requests
      </div>
    );
  }

  async function deleteRequest(userId: string) {
    try {
      const res = await fetch(ApiRoutes.ToggleGameRequest, {
        method: "POST",
        body: JSON.stringify({
          gameId,
          userId,
          newStatus: false,
        }),
      });
      if (!res.ok) {
        // TODO some error handling
        toast({
          type: "background",
          variant: "destructive",
          title: "Action failed",
        });
        return;
      }

      const newRequestList = [...allRequests].filter(
        (r) => !(r.game.id === gameId && r.user.id === userId)
      );

      setAllRequests(() => newRequestList);
    } catch (error: any) {
      //
    }
  }

  const canCancelOtherRequests = isRole("Admin", "Holder");

  return (
    <>
      <div className="w-full flex flex-row justify-start text-left text-xxs md:text-xs max-h-24 overflow-hidden hover:overflow-y-scroll z-1000">
        <ul className="flex flex-wrap text-left justify-items-start justify-start gap-1">
          {requesters.map((r, i) => (
            <li key={i}>
              <Tag
                tag={
                  <div className="flex flex-row">
                    <div>{r.user.name}</div>
                    <Conditional when={canCancelOtherRequests}>
                      <button
                        className="rounded-full bg-sky-100 ml-1 px-1"
                        onClick={() => deleteRequest(r.user.id)}
                      >
                        <CustomFontAwesomeIcon icon={faTimes} />
                      </button>
                    </Conditional>
                  </div>
                }
                className="p-0 px-1"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
