import Image from "next/image";

import { useUserSettings } from "#/state/settings";
import { useInterface } from "#/state/interface";

import { cn } from "#/lib/cn";

export function Alignment() {
  const alignment = useUserSettings(store => store.alignment);
  const setAlignment = useUserSettings(store => store.setAlignment);
  const mode = useInterface(store => store.mode);

  return (
    <>
      <span
        className={cn(
          "mt-[15px] pl-[15px] text-[14px] leading-[17px]",
          mode === 0
            ? " text-subtext"
            : mode === 1
            ? " text-subtext"
            : mode === 2
            ? " text-candybuttonhighlight"
            : mode === 3
            ? " text-galaxysubtext"
            : "",
        )}
      >
        Chat Alignment
      </span>

      <div
        className={cn(
          "mt-[10px] flex items-center justify-between rounded-[5px] p-5",
          mode === 0
            ? " bg-button"
            : mode === 1
            ? " bg-[#EDEDF0] text-title"
            : mode === 2
            ? " bg-candybutton text-candytitle"
            : mode === 3
            ? " bg-galaxybutton text-white"
            : "",
        )}
      >
        <button
          className={cn(
            "duration-800 group flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition",
            alignment === 0
              ? mode === 0
                ? " text-blue2"
                : mode === 1
                ? " text-blue2"
                : mode === 2
                ? " text-candybuttonhighlight"
                : mode === 3
                ? " text-[#5200FF]"
                : ""
              : "",
          )}
          onClick={() => setAlignment(0)}
        >
          <div
            className={cn(
              "duration-800 overflow-hidden rounded-[5px] border transition",
              alignment === 0
                ? mode === 0
                  ? " border-blue2 group-hover:border-blue2"
                  : mode === 1
                  ? " border-blue2 group-hover:border-blue2"
                  : mode === 2
                  ? " border-[#FF36F7] group-hover:border-[#FF36F7]"
                  : mode === 3
                  ? " border-[#5200FF] group-hover:border-[#5200FF]"
                  : ""
                : mode === 0
                ? " border-subtext"
                : mode === 1
                ? " border-subtext"
                : mode === 2
                ? " border-transparent"
                : mode === 3
                ? " border-galaxybuttonhighlight"
                : "",
            )}
          >
            {mode === 0 && (
              <Image
                width={110}
                height={76}
                src="/images/messages/alignments/left and right.svg"
                alt=""
              />
            )}
            {mode === 1 && (
              <Image
                width={110}
                height={76}
                src="/images/messages/alignments/left and right-light.svg"
                alt=""
              />
            )}
            {mode === 2 && (
              <Image
                width={110}
                height={76}
                src="/images/messages/alignments/left and right-candy.svg"
                alt=""
              />
            )}
            {mode === 3 && (
              <Image
                width={110}
                height={76}
                src="/images/messages/alignments/left and right-galaxy.svg"
                alt=""
              />
            )}
          </div>
          <span>Left and Right</span>
          {alignment === 0 ? (
            mode === 0 || mode === 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <rect x="0.5" width="20" height="20" rx="10" fill="#048DFF" />
                <path
                  d="M5.5 9.14286L9.1 13L15.5 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : mode === 2 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 21"
                fill="none"
              >
                <rect y="0.25" width="20" height="20" rx="10" fill="#DD57AF" />
                <path
                  d="M5 9.39286L8.6 13.25L15 7.25"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            ) : mode === 3 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 21"
                fill="none"
              >
                <rect y="0.25" width="20" height="20" rx="10" fill="#5200FF" />
                <path
                  d="M5 9.39286L8.6 13.25L15 7.25"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            ) : null
          ) : (
            <div
              className={cn("h-[20px] w-[20px] rounded-full border", {
                "border-[#31333C] bg-inputback": mode === 0,
                "border-[#C4C7CB] bg-white1": mode === 1,
                "border-candysubtext bg-candynav": mode === 2,
                "border-[#5200FF] bg-[rgba(11,3,16,.5)]": mode === 3,
              })}
            />
          )}
        </button>
        <button
          className={cn(
            "duration-800 group flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition",
            alignment === 1
              ? mode === 0
                ? " text-blue2"
                : mode === 1
                ? " text-blue2"
                : mode === 2
                ? " text-candybuttonhighlight"
                : mode === 3
                ? " text-[#5200FF]"
                : ""
              : "",
          )}
          onClick={() => setAlignment(1)}
        >
          <div
            className={cn(
              "duration-800 overflow-hidden rounded-[5px] border transition",
              alignment === 1
                ? mode === 0
                  ? " border-blue2 group-hover:border-blue2"
                  : mode === 1
                  ? " border-blue2 group-hover:border-blue2"
                  : mode === 2
                  ? " border-[#FF36F7] group-hover:border-[#FF36F7]"
                  : mode === 3
                  ? " border-[#5200FF] group-hover:border-[#5200FF]"
                  : ""
                : mode === 0
                ? " border-subtext"
                : mode === 1
                ? " border-subtext"
                : mode === 2
                ? " border-transparent"
                : mode === 3
                ? " border-galaxybuttonhighlight"
                : "",
            )}
          >
            {mode === 0 && (
              <Image
                width={110}
                height={76}
                src="/images/messages/alignments/left.svg"
                alt=""
              />
            )}
            {mode === 1 && (
              <Image
                width={110}
                height={76}
                src="/images/messages/alignments/left-light.svg"
                alt=""
              />
            )}
            {mode === 2 && (
              <Image
                width={110}
                height={76}
                src="/images/messages/alignments/left-candy.svg"
                alt=""
              />
            )}
            {mode === 3 && (
              <Image
                width={110}
                height={76}
                src="/images/messages/alignments/left-galaxy.svg"
                alt=""
              />
            )}
          </div>
          <span>Left Aligned</span>
          {alignment === 1 ? (
            mode === 0 || mode === 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <rect x="0.5" width="20" height="20" rx="10" fill="#048DFF" />
                <path
                  d="M5.5 9.14286L9.1 13L15.5 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : mode === 2 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 21"
                fill="none"
              >
                <rect y="0.25" width="20" height="20" rx="10" fill="#DD57AF" />
                <path
                  d="M5 9.39286L8.6 13.25L15 7.25"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            ) : mode === 3 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 21"
                fill="none"
              >
                <rect y="0.25" width="20" height="20" rx="10" fill="#5200FF" />
                <path
                  d="M5 9.39286L8.6 13.25L15 7.25"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            ) : null
          ) : (
            <div
              className={cn("h-[20px] w-[20px] rounded-full border", {
                "border-[#31333C] bg-inputback": mode === 0,
                "border-[#C4C7CB] bg-white1": mode === 1,
                "border-candysubtext bg-candynav": mode === 2,
                "border-[#5200FF] bg-[rgba(11,3,16,.5)]": mode === 3,
              })}
            />
          )}
        </button>
      </div>
    </>
  );
}
