import { getGamesSuggestions } from "@/database/game-suggestions/getGamesSuggestions";
import { VoteContent } from "./VoteContent";
import { getGamesSuggestionVotes } from "@/database/game-suggestion-votes/getGamesSuggestionVotes";
import { isRole } from "@/util/auth/server/isRole";

export default async function ListGameSuggestions() {
  const gameSuggestions = await getGamesSuggestions();
  const gameVotes = await getGamesSuggestionVotes();
  const displayVotes = await isRole("Admin");

  return (
    <VoteContent
      gameSuggestions={gameSuggestions}
      votes={gameVotes}
      displayVotes={displayVotes}
    />
  );
}
