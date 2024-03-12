import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { useContext, useMemo } from "react";
import { GameCardActionButton } from "./GameCardActionButton";
import { GameRequestsContext } from "@/components/game-requests/GameRequestContext";
import { useUserData } from "@/util/auth/client/useUserData";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { ApiRoutes } from "@/constants/routes";
import { useToast } from "@/components/shadcn/use-toast";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";

type RequestGameButtonProps = {
  gameId: number;
};
export function ToggleRequestButton(props: RequestGameButtonProps) {
  const { allRequests, setAllRequests } = useContext(GameRequestsContext);
  const { userData } = useUserData();
  const { gameId } = props;
  const { toast } = useToast();

  const relevantRequests = useMemo(
    () => allRequests.filter((r) => r.game.id === gameId),
    [allRequests, gameId]
  );
  const totalRequests = relevantRequests.length;
  const requesters = relevantRequests.map((r) => r.user.name);
  const userRequested = useMemo(
    () => relevantRequests.filter((r) => r.user.id === userData?.id).length > 0,
    [relevantRequests, userData]
  );
  const icon = userRequested ? fullStar : emptyStar;

  async function toggleGameRequest() {
    try {
      const newStatus = !userRequested;

      const res = await fetch(ApiRoutes.ToggleGameRequest, {
        method: "POST",
        body: JSON.stringify({
          gameId,
          userId: userData?.id,
          newStatus: newStatus,
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

      let newRequestList = [...allRequests];
      if (newStatus) {
        newRequestList = [
          ...newRequestList,
          {
            game: { id: gameId },
            user: { id: userData?.id!, name: userData?.name! },
          },
        ];
      } else {
        newRequestList = newRequestList.filter(
          (r) => !(r.game.id === gameId && r.user.id === userData?.id)
        );
      }

      setAllRequests(() => newRequestList);
      toast({
        type: "background",
        title: newStatus ? "Game requested" : "Game request removed",
      });
    } catch (error: any) {
      //
    }
  }

  return (
    <>
      <GameCardActionButton
        body={<CustomFontAwesomeIcon icon={icon} />}
        hatCount={totalRequests}
        onClick={toggleGameRequest}
        hatReveal={
          <div>
            <div>Requested by: </div>
            <ul>
              {requesters.map((r, j) => (
                <li key={j}>{r}</li>
              ))}
            </ul>
          </div>
        }
      />
    </>
  );
}
