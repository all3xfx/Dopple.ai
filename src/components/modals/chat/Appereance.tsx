import Image from "next/image";
import { useInterface } from "#/state/interface";
import { cn } from "#/lib/cn";

export function Appereance() {
  const mode = useInterface(store => store.mode);
  const setMode = useInterface(store => store.setMode);

  return (
    <>
      <span
        className={cn(
          "pl-[15px] text-[14px] leading-[17px]",
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
        Chat Appearance
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
            mode === 0 ? " text-blue2" : "",
          )}
          onClick={() => setMode(0)}
        >
          <div
            className={cn(
              "duration-800 rounded-[5px] border transition",
              mode === 0
                ? " border-blue2 group-hover:border-blue2"
                : mode === 1
                ? " border-[#8A939D] group-hover:border-blue2"
                : mode === 2
                ? " border-[#8A939D] group-hover:border-candybuttonhighlight"
                : mode === 3
                ? " border-[#8A939D] group-hover:border-[#5200FF]"
                : "",
            )}
          >
            <Image
              width={60}
              height={45}
              className="w-[60px]"
              src="/images/account/darktheme-desktop.svg"
              alt=""
            />
          </div>
          <span>Dark</span>
          {mode === 0 ? (
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
            mode === 1 ? " text-blue2" : "",
          )}
          onClick={() => setMode(1)}
        >
          <div
            className={cn(
              "duration-800 rounded-[5px] border transition",
              mode === 0
                ? " border-[#8A939D] group-hover:border-blue2"
                : mode === 1
                ? " border-blue2 group-hover:border-blue2"
                : mode === 2
                ? " border-[#8A939D] group-hover:border-candybuttonhighlight"
                : mode === 3
                ? " border-[#8A939D] group-hover:border-[#5200FF]"
                : "",
            )}
          >
            <Image
              width={60}
              height={45}
              className="w-[60px]"
              src="/images/account/lighttheme-desktop.svg"
              alt=""
            />
          </div>
          <span>Light</span>
          {mode === 1 ? (
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
            mode === 2 ? " text-candybuttonhighlight" : "",
          )}
          onClick={() => setMode(2)}
        >
          <div
            className={cn(
              "duration-800 rounded-[5px] border transition",
              mode === 0
                ? " border-[#8A939D] group-hover:border-blue2"
                : mode === 1
                ? " border-[#8A939D] group-hover:border-blue2"
                : mode === 2
                ? " border-candybuttonhighlight group-hover:border-candybuttonhighlight"
                : mode === 3
                ? " border-[#8A939D] group-hover:border-[#5200FF]"
                : "",
            )}
          >
            <Image
              width={60}
              height={45}
              className="w-[60px]"
              src="/images/account/candytheme-desktop.svg"
              alt=""
            />
          </div>
          <span>Candy</span>
          {mode === 2 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 21 21"
              fill="none"
            >
              <rect
                x="0.375"
                y="0.25"
                width="20"
                height="20"
                rx="10"
                fill="#DD57AF"
              />
              <path
                d="M5.375 9.39286L8.975 13.25L15.375 7.25"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
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
            mode === 3 ? " text-[#5200FF]" : "",
          )}
          onClick={() => setMode(3)}
        >
          <div
            className={cn(
              "duration-800 rounded-[5px] border transition",
              mode === 0
                ? " border-[#8A939D] group-hover:border-blue2"
                : mode === 1
                ? " border-[#8A939D] group-hover:border-blue2"
                : mode === 2
                ? " border-[#8A939D] group-hover:border-candybuttonhighlight"
                : mode === 3
                ? " border-[#5200FF] group-hover:border-[#5200FF]"
                : "",
            )}
          >
            <Image
              width={60}
              height={45}
              className="w-[60px]"
              src="/images/account/galaxytheme-desktop.svg"
              alt=""
            />
          </div>
          <span>Galaxy</span>
          {mode === 3 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 21 21"
              fill="none"
            >
              <rect
                x="0.125"
                y="0.25"
                width="20"
                height="20"
                rx="10"
                fill="#5200FF"
              />
              <path
                d="M5.125 9.39286L8.725 13.25L15.125 7.25"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
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
