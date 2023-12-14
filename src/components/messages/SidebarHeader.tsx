"use client";

import { cn } from "#/lib/cn";
import { useInterface } from "#/state/interface";
import { useMessages } from "#/state/messages";
import Link from "next/link";

export function SidebarHeader() {
  const searchTerm = useMessages(state => state.searchTerm);
  const setSearchTerm = useMessages(state => state.setSearchTerm);
  const mode = useInterface(state => state.mode);

  return (
    <div
      className={cn(
        "flex min-h-[70px] items-center space-x-5 border-b px-5",
        mode === 0
          ? " border-button bg-nav"
          : mode === 1
          ? " border-[#EDEDF0] bg-white"
          : mode === 2
          ? " border-candysubtext bg-candynav"
          : mode === 3
          ? " border-galaxybutton bg-[rgba(11,3,16,.75)]"
          : "",
      )}
    >
      <Link href="/">
        <svg
          className={cn(
            "cursor-pointer",
            mode === 0
              ? ""
              : mode === 1
              ? " text-title"
              : mode === 2
              ? " text-candysubtext"
              : mode === 3
              ? ""
              : "",
          )}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M2 9L9.28571 2M2 9L9.28571 16M2 9L19 9"
            strokeWidth="2"
            strokeLinecap="square"
          />
        </svg>
      </Link>
      <div
        className={cn(
          "duration-800 flex h-[45px] w-0 flex-1 items-center space-x-[10px] rounded-[5px] border border-transparent px-[15px] transition focus-within:border-blue2",
          mode === 0 &&
            "bg-button text-subtext focus-within:text-white hover:bg-black5",
          mode === 1 &&
            "bg-[#EDEDF0] text-subtext focus-within:text-title hover:bg-[#DDD]",
          mode === 2 &&
            "bg-candybutton text-candysubtext focus-within:text-candytitle",
          mode === 3 &&
            "bg-galaxybutton text-galaxysubtext focus-within:text-white",
        )}
      >
        <svg
          className="min-w-[15px]"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 21 21"
          fill="currentColor"
        >
          <path d="M20.1714 18.5942L16.3949 14.8287C17.6134 13.2764 18.2745 11.3595 18.2721 9.38603C18.2721 7.62854 17.7509 5.91052 16.7745 4.44922C15.7981 2.98792 14.4103 1.84897 12.7866 1.17641C11.1629 0.50385 9.37617 0.327877 7.65245 0.670746C5.92873 1.01362 4.34539 1.85993 3.10266 3.10266C1.85993 4.34539 1.01362 5.92873 0.670746 7.65245C0.327877 9.37617 0.50385 11.1629 1.17641 12.7866C1.84897 14.4103 2.98792 15.7981 4.44922 16.7745C5.91052 17.7509 7.62854 18.272 9.38603 18.272C11.3595 18.2745 13.2764 17.6134 14.8287 16.3949L18.5942 20.1714C18.6974 20.2755 18.8203 20.3582 18.9556 20.4146C19.091 20.471 19.2362 20.5 19.3828 20.5C19.5294 20.5 19.6746 20.471 19.81 20.4146C19.9453 20.3582 20.0682 20.2755 20.1714 20.1714C20.2755 20.0682 20.3582 19.9453 20.4146 19.81C20.471 19.6746 20.5 19.5294 20.5 19.3828C20.5 19.2362 20.471 19.091 20.4146 18.9556C20.3582 18.8203 20.2755 18.6974 20.1714 18.5942ZM2.72151 9.38603C2.72151 8.06791 3.11238 6.77939 3.84468 5.68342C4.57699 4.58745 5.61785 3.73324 6.83563 3.22882C8.05341 2.72439 9.39342 2.59241 10.6862 2.84957C11.979 3.10672 13.1665 3.74145 14.0986 4.6735C15.0306 5.60555 15.6653 6.79305 15.9225 8.08584C16.1796 9.37863 16.0477 10.7186 15.5432 11.9364C15.0388 13.1542 14.1846 14.1951 13.0886 14.9274C11.9927 15.6597 10.7041 16.0505 9.38603 16.0505C7.61849 16.0505 5.92334 15.3484 4.6735 14.0986C3.42366 12.8487 2.72151 11.1536 2.72151 9.38603Z" />
        </svg>
        <input
          className={cn(
            "w-0 flex-1 text-[14px] leading-[17px] caret-blue2",
            mode === 0 && "placeholder-subtext",
            mode === 1 && "text-black placeholder-subtext",
            mode === 2 && "text-black placeholder-candysubtext",
            mode === 3 && "text-white placeholder-galaxysubtext",
          )}
          placeholder="Search Message"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
