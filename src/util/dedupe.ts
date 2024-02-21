export function dedupe<T>(arr: T[]): T[] {
  return arr.filter((a, i) => arr.indexOf(a) === i);
}
