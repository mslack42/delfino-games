import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { ActionBarButton } from "./ActionBarButton";
import Link from "next/link";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { BggLink } from "@/components/common/BggLink";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";
import { Conditional } from "../common/Conditional";
import { useContext, useMemo } from "react";
import { GameSuggestionsContext } from "../game-suggestions/GameSuggestionContext";
import { useUserData } from "@/util/auth/client/useUserData";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { BggSearchResult } from "@/bgg/types";
import { useToast } from "../shadcn/use-toast";

type ActionSet = "addGame" | "suggestGame";

export function SearchResultActionBar({
  bggSearchResult,
  actionSet,
}: {
  bggSearchResult: BggSearchResult;
  actionSet: ActionSet;
}) {
  return (
    <>
      <div className="relative h-full bottom-0 flex flex-col justify-end">
        <ul className="flex flex-row-reverse gap-2  p-2">
          <Conditional when={actionSet == "addGame"}>
            <AddGameButtons bggId={bggSearchResult.bggId} />
          </Conditional>
          <Conditional when={actionSet == "suggestGame"}>
            <SuggestGameButtons bggSearchResult={bggSearchResult} />
          </Conditional>
          <li title="BoardGameGeek link">
            <ActionBarButton>
              <BggLink bggId={bggSearchResult.bggId}></BggLink>
            </ActionBarButton>
          </li>
        </ul>
      </div>
    </>
  );
}

function AddGameButtons({ bggId }: { bggId: number }) {
  return (
    <>
      <li title="Add game">
        <ActionBarButton>
          <Link href={ApplicationRoutes.AddGame(bggId)}>
            <CustomFontAwesomeIcon icon={faPlus}></CustomFontAwesomeIcon>
          </Link>
        </ActionBarButton>
      </li>
    </>
  );
}

function SuggestGameButtons({
  bggSearchResult,
}: {
  bggSearchResult: BggSearchResult;
}) {
  const { allSuggestions, setAllSuggestions } = useContext(
    GameSuggestionsContext
  );
  const { userData } = useUserData();
  const { toast } = useToast();

  const userSuggested = useMemo(
    () =>
      allSuggestions.some(
        (s) =>
          s.game.bggId == bggSearchResult.bggId && s.user.id == userData?.id
      ),
    [bggSearchResult, userData, allSuggestions]
  );

  async function toggleGameSuggestion() {
    try {
      const newStatus = !userSuggested;

      const res = await fetch(ApiRoutes.ToggleGameSuggestion, {
        method: "POST",
        body: JSON.stringify({
          bggSearchResult,
          userId: userData?.id,
          newStatus: newStatus,
        }),
      });
      if (!res.ok) {
        const body = await res.json();
        if (
          res.status === 400 &&
          body["reason"] &&
          body["reason"] === "TooManyGameSuggestions"
        ) {
          toast({
            type: "background",
            variant: "destructive",
            title: "You cannot suggest more than 3 games at once",
          });
        } else if (res.status === 409) {
          // Do nothing - presumably spammed request
        } else {
          toast({
            type: "background",
            variant: "destructive",
            title: "Action failed",
          });
        }

        return;
      }

      let newSuggestionList = [...allSuggestions];
      if (newStatus) {
        newSuggestionList = [
          ...newSuggestionList,
          {
            game: bggSearchResult,
            user: { id: userData?.id!, name: userData?.name! },
          },
        ];
      } else {
        newSuggestionList = newSuggestionList.filter(
          (r) =>
            !(
              r.game.bggId === bggSearchResult.bggId &&
              r.user.id === userData?.id
            )
        );
      }

      setAllSuggestions(() => newSuggestionList);
      toast({
        type: "background",
        title: newStatus ? "Game suggested" : "Game suggestion removed",
      });
    } catch (error: any) {
      toast({
        type: "background",
        variant: "destructive",
        title: "Action failed",
      });
    }
  }

  return (
    <>
      <li title="Suggest game">
        <ActionBarButton action={toggleGameSuggestion}>
          <Conditional when={userSuggested}>
            <CustomFontAwesomeIcon icon={faMinus}></CustomFontAwesomeIcon>
          </Conditional>
          <Conditional when={!userSuggested}>
            <CustomFontAwesomeIcon icon={faPlus}></CustomFontAwesomeIcon>
          </Conditional>
        </ActionBarButton>
      </li>
    </>
  );
}
