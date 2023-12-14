import { useInterface } from "#/state/interface";
import { getLastMsgDate } from "#/utilities/format";
import Link from "next/link";
import Image from "next/image";

import { cn } from "#/lib/cn";

interface SidebarItemProps {
  item: DoppleItem;
}

export function SidebarItem({ item }: SidebarItemProps) {
  const mode = useInterface(store => store.mode);

  return (
    <Link
      className={cn(
        "group flex items-center justify-between space-x-2 px-5 py-[15px]" +
          (mode === 0
            ? " hover:bg-button"
            : mode === 1
            ? " hover:bg-[#E7F2FF]"
            : mode === 2
            ? " bg-candybutton hover:bg-candysubtext"
            : mode === 3
            ? " hover:bg-galaxybutton"
            : ""),
      )}
      href={"/messages/" + item._id}
    >
      <div className={cn("flex w-[0px] flex-1 items-center space-x-[10px]")}>
        <Image
          width={50}
          height={50}
          className={cn("h-[50px] w-[50px] rounded-[10px]")}
          src={item.avatarURL + "?tr=w-50,h-50"}
          alt=""
        />
        <div
          className={cn(
            "flex w-[0px] flex-1 flex-col items-start space-y-[8.61px]",
          )}
        >
          <div
            className={cn(
              "flex w-full items-center space-x-[5px] text-[16px] font-bold leading-[19px]",
              mode === 0
                ? ""
                : mode === 1
                ? " text-title"
                : mode === 2
                ? " text-candytitle group-hover:text-white"
                : mode === 3
                ? " text-galaxytitle"
                : "",
            )}
          >
            <span className="truncate">{item.name}</span>
            <svg
              className={cn(
                "min-w-[15px]",
                mode === 0
                  ? " text-white"
                  : mode === 1
                  ? " text-blue2"
                  : mode === 2
                  ? // TODO: Implement active state, based on params.
                    item._id === ""
                    ? " text-white"
                    : " text-[#FF36F7] group-hover:text-white"
                  : mode === 3
                  ? " text-[#5200FF]"
                  : "",
              )}
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.9819 2.41014L9.77743 0L7.46635 1.23424L5.14217 0.0274191L3.9637 2.45166L1.40753 2.90911L1.81179 5.59736L0 7.54436L1.83259 9.46981L1.45722 12.1627L4.01814 12.5899L5.22258 15L7.53365 13.7658L9.85783 14.9726L11.0363 12.5483L13.5925 12.0909L13.1882 9.40264L15 7.45564L13.1674 5.53019L13.5428 2.83733L10.9819 2.41014ZM10.4614 6.40134L9.51696 5.41004L6.95099 8.10297L5.48291 6.5621L4.53841 7.55335L6.95095 10.0855L10.4614 6.40134Z"
              />
            </svg>
          </div>
          <div
            className={cn(
              "flex w-full items-center space-x-[5px] text-[14px] leading-[17px]",
              mode === 0
                ? " text-subtext"
                : mode === 1
                ? " text-subtext"
                : mode === 2
                ? " text-candysubtext group-hover:text-white"
                : mode === 3
                ? " text-galaxysubtext"
                : "",
            )}
          >
            <span className="flex-1 truncate text-left">
              {
                item.chat_history[item.chat_history.length - 1]?.message?.data
                  ?.content
              }
            </span>
          </div>
        </div>
      </div>
      <div className={cn("flex flex-col items-end space-y-[10.55px]")}>
        <span
          className={cn(
            "text-[12px] leading-[14px]",
            mode === 0
              ? " text-subtext"
              : mode === 1
              ? " text-subtext"
              : mode === 2
              ? " text-candysubtext group-hover:text-white"
              : mode === 3
              ? " text-galaxysubtext"
              : "",
          )}
        >
          {getLastMsgDate(
            item.chat_history[item.chat_history.length - 1]?.timestamp * 1000,
          )}
        </span>
        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full text-[14px] leading-[17px] opacity-0",
            mode === 0
              ? " bg-blue2"
              : mode === 1
              ? " bg-blue2"
              : mode === 2
              ? " bg-[#FF36F7] group-hover:bg-white"
              : mode === 3
              ? " bg-[#5200FF]"
              : "",
          )}
        >
          <span
            className={
              mode === 0
                ? ""
                : mode === 1
                ? ""
                : mode === 2
                ? "group-hover:text-[#FF36F7]"
                : mode === 3
                ? ""
                : ""
            }
          >
            2
          </span>
        </div>
      </div>
    </Link>
  );
}
