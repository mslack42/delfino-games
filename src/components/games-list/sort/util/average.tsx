"use client";
export function average(vals: (number | null | undefined)[]) {
  const actualVals = vals.filter((v) => v) as number[];
  if (actualVals.length === 0) {
    return 0;
  }
  return actualVals.reduce((a, b) => a + b, 0) / actualVals.length;
}
