"use client";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Conditional } from "./Conditional";

type Props = FontAwesomeIconProps & { className?: string };

export function CustomFontAwesomeIcon(props: Props) {
  const [mounted, setMounted] = useState(false);

  // Check for mount before loading fa icons, else they go bug-eyed
  // Might be able to mitigate with caching?
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <Conditional when={mounted}>
      <FontAwesomeIcon {...props} />
    </Conditional>
  );
}
