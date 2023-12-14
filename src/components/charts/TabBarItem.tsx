"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedIcon } from "../animations/Icons";
import { useState } from "react";
import { cn } from "#/lib/cn";

interface TabBarItemProps {
  href: string;
  iconKey?: string;
  children: React.ReactNode;
}

export function TabBarItem({ href, iconKey, children }: TabBarItemProps) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      className={cn(
        "flex h-[45px] min-w-fit items-center space-x-[5px] rounded-[5px] border border-button px-[17px] transition hover:bg-button",
        pathname === href && "bg-button",
      )}
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {iconKey ? <AnimatedIcon type={iconKey as any} active={hovered} /> : null}
      {children}
    </Link>
  );
}
