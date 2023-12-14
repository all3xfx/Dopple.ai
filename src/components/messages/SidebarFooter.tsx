"use client";

import { useInterface } from "#/state/interface";
import { SidebarLogo } from "./SidebarLogo";

import { cn } from "#/lib/cn";

export function SidebarFooter() {
  const mode = useInterface(state => state.mode);

  return (
    <footer
      className={cn(
        "message-footer relative z-[3] flex h-[70px] w-full items-center justify-between border-t px-5",
        mode === 0
          ? " border-button bg-nav-desktop"
          : mode === 1
          ? " border-[#EDEDF0] bg-white"
          : mode === 2
          ? " border-candysubtext bg-candynav"
          : mode === 3
          ? " border-galaxybutton bg-[rgba(11,3,16,.75)]"
          : "",
      )}
    >
      <SidebarLogo />
      <span
        className={cn(
          "max-w-[142px] text-right text-[12px] leading-[14px]",
          mode === 0
            ? " text-[#8A939D]"
            : mode === 1
            ? " text-[#8A939D]"
            : mode === 2
            ? " text-candysubtext"
            : mode === 3
            ? " text-galaxysubtext"
            : "",
        )}
      >
        © 2023 Dopple Labs Inc.
      </span>
    </footer>
  );
}
