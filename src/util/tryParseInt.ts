export const tryParseInt = (s: string): number | undefined => {
  try {
    const value = Number.parseInt(s);
    if (Number.isFinite(value)) {
      return value;
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
};
