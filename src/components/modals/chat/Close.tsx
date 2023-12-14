import * as Dialog from "@radix-ui/react-dialog";
import { useInterface } from "#/state/interface";

import { cn } from "#/lib/cn";

export function Close() {
  const mode = useInterface(store => store.mode);

  return (
    <Dialog.Close>
      <div
        className={cn(
          "duration-800 absolute right-[20px] top-[13px] flex h-[45px] w-[45px] items-center justify-center rounded-[5px] transition" +
            (mode === 0
              ? " bg-button hover:bg-[#34363C]"
              : mode === 1
              ? " bg-[#EDEDF0] hover:bg-[#DCDCE0]"
              : mode === 2
              ? " bg-candybutton"
              : mode === 3
              ? " bg-galaxybutton"
              : ""),
        )}
      >
        <svg
          className={cn(
            mode === 0
              ? "text-blue2"
              : mode === 1
              ? "text-blue2"
              : mode === 2
              ? "text-candybuttonhighlight"
              : mode === 3
              ? "text-galaxybuttonhighlight"
              : "",
          )}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 23 23"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M2 2L21 21M2 21L21 2"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Dialog.Close>
  );
}
