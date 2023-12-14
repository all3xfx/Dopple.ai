"use client";

import Image from "next/image";
import { cn } from "#/lib/cn";
import { useSearch } from "#/state/search";
import Link from "next/link";

export function Logo() {
  const searchActive = useSearch(store => store.searchActive);

  return (
    <Link
      href="/"
      aria-label="Explore"
      className={cn("flex-auto", searchActive ? "hidden lg:block" : false)}
    >
      <Image
        width={222}
        height={33}
        className={cn(
          "duration-800 h-[33px] w-[222px] origin-left transition hover:scale-[1.02] md1:h-[30px] md1:w-[207px]",
        )}
        src="/images/logo-header.svg"
        alt=""
      />
    </Link>
  );
}
