import { getGamesSuggestions } from "@/database/game-suggestions/getGamesSuggestions";
import { SuggestGame } from "./suggestGame";

export default async function SuggestGamePage() {
  const initGameSuggestions = await getGamesSuggestions();
  return <SuggestGame gameSuggestions={initGameSuggestions} />;
}
