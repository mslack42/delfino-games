import { getUserData } from "@/util/auth/server/getUserData";
import { getUserGameVotes } from "@/database/game-suggestion-votes/getUserGameVotes";
import { getGamesSuggestions } from "@/database/game-suggestions/getGamesSuggestions";
import { ProfileGameSuggestionsContent } from "./ProfileGameSuggestionsContent";

export async function ProfileGameSuggestionsAndVotes() {
  const user = await getUserData();
  const suggestions = await getGamesSuggestions();
  const votes = await getUserGameVotes(user.id);

  const thisUsersGamesSuggestions = suggestions.filter(
    (gs) => gs.user.id == user.id
  );

  return (
    <ProfileGameSuggestionsContent
      thisUsersGamesSuggestions={thisUsersGamesSuggestions}
      votes={votes}
    />
  );
}
