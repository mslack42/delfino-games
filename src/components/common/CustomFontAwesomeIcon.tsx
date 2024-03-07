"use client";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export function CustomFontAwesomeIcon(props: FontAwesomeIconProps) {
  const [mounted, setMounted] = useState(false);

  // Check for mount before loading fa icons, else they go bug-eyed
  // Might be able to mitigate with caching?
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return <>{mounted && <FontAwesomeIcon {...props} />}</>;
}
