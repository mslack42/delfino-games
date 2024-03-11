import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};
export function LoadingIdler(props: Props) {
  const [dots, setDots] = useState(0);
  const dots_max = 3;

  useEffect(() => {
    setTimeout(() => {
      setDots((dots + 1) % (dots_max + 1));
    }, 400);
  });

  const ellipses = useMemo(() => {
    const tail =
      Array(dots).fill(". ").join("") +
      Array(dots_max - dots)
        .fill("  ")
        .join("");
    return tail;
  }, [dots]);
  const body = "Loading " + ellipses + `⏳`;

  return <p className={twMerge("whitespace-pre", props.className)}>{body}</p>;
}
