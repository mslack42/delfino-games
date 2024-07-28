import { getUserData } from "@/util/auth/server/getUserData";
import { getUserGameVotes } from "@/database/game-suggestion-votes/getUserGameVotes";
import { getGamesSuggestions } from "@/database/game-suggestions/getGamesSuggestions";
import { ProfileGameSuggestionsContent } from "./ProfileGameSuggestionsContent";

export async function ProfileGameSuggestionsAndVotes() {
  const user = await getUserData();
  const suggestions = await getGamesSuggestions();
  const votes = await getUserGameVotes(user.id);

  return (
    <ProfileGameSuggestionsContent
      gameSuggestions={suggestions}
      userId={user.id}
      votes={votes}
    />
  );
}
