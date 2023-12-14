"use client";

import { useState } from "react";
import { cn } from "#/lib/cn";

interface BiographyProps {
  text: string;
}

export function Biography({ text }: BiographyProps) {
  const [expanded, setExpanded] = useState(false);

  const truncatedText = text.slice(0, 200);

  return (
    <span
      className={cn(
        "mt-[15px] w-full text-[14px] leading-[17px] text-subtext md:max-w-[600px]",
      )}
    >
      {expanded ? text : truncatedText}
      {truncatedText.length !== text.length ? "..." : ""}
      {text.length > 200 ? (
        <button
          className={cn("ml-1 cursor-pointer font-bold text-blue2")}
          onClick={() => setExpanded(prevValue => !prevValue)}
        >
          Read {expanded ? "less" : "more"}
        </button>
      ) : null}
    </span>
  );
}
