type MaybeNumber = number | undefined | null;

export function playerCount(
  maxPlayerCount: MaybeNumber,
  minPlayerCount: MaybeNumber
) {
  const playerCountString =
    minPlayerCount && maxPlayerCount && minPlayerCount !== maxPlayerCount
      ? `${minPlayerCount}-${maxPlayerCount} players`
      : minPlayerCount
        ? `${minPlayerCount} players`
        : maxPlayerCount
          ? `${maxPlayerCount} players`
          : "?";

  return playerCountString;
}

export function playTime(
  maxPlaytimeMinutes: MaybeNumber,
  minPlaytimeMinutes: MaybeNumber
) {
  const playTimeString =
    minPlaytimeMinutes &&
    maxPlaytimeMinutes &&
    minPlaytimeMinutes !== maxPlaytimeMinutes
      ? `${minPlaytimeMinutes}-${maxPlaytimeMinutes} mins`
      : minPlaytimeMinutes
        ? `${minPlaytimeMinutes} mins`
        : maxPlaytimeMinutes
          ? `${maxPlaytimeMinutes} mins`
          : "?";

  return playTimeString;
}

export function bggUrl(bggId: number) {
  return `https://boardgamegeek.com/boardgame/${bggId}`;
}
