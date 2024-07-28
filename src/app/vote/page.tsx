import { getGamesSuggestions } from "@/database/game-suggestions/getGamesSuggestions";
import { VoteContent } from "./VoteContent";
import { getGamesSuggestionVotes } from "@/database/game-suggestion-votes/getGamesSuggestionVotes";

export default async function ListGameSuggestions() {
  const gameSuggestions = await getGamesSuggestions();
  const gameVotes = await getGamesSuggestionVotes();

  return <VoteContent gameSuggestions={gameSuggestions} votes={gameVotes} />;
}
