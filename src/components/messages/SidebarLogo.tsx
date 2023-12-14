"use client";

import { cn } from "#/lib/cn";
import { useInterface } from "#/state/interface";
import Link from "next/link";
import Image from "next/image";

export function SidebarLogo() {
  const mode = useInterface(state => state.mode);

  return (
    <Link href="/" className="h-30 relative cursor-pointer">
      <Image
        width={123}
        height={34}
        className={cn("h-[30px]")}
        src={
          mode === 0
            ? "/images/logo-footer.svg"
            : mode === 1
            ? "/images/logo-footer-light.svg"
            : mode === 2
            ? "/images/logo-footer-candy.svg"
            : "/images/logo-footer-galaxy.svg"
        }
        alt=""
      />
    </Link>
  );
}
