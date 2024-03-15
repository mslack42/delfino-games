import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Increase this number any time there are breaking changes to local storage shape
const keyBase = `${2}`;

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
  combiner?: (cacheVal: T, defVal: T) => T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return defaultValue;
      const dataString = localStorage.getItem(key + keyBase);
      if (!dataString) return defaultValue;
      const data = JSON.parse(dataString!) as T;
      if (!combiner) return data;
      return combiner(data, defaultValue);
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key + keyBase, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}
