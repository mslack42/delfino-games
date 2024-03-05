export function levenshtein(word1: string, word2: string): number {
  try {
    return lv(word1, word2);
  } catch (e) {
    return 99999;
  }
}

function lv(w1: string, w2: string): number {
  if (!w1.length) {
    return w2.length;
  }
  if (!w2.length) {
    return w1.length;
  }
  if (w1[0] === w2[0]) {
    return levenshtein(w1.slice(1), w2.slice(1));
  } else {
    return 1 + levenshtein(w1.slice(1), w2.slice(1));
  }
}
