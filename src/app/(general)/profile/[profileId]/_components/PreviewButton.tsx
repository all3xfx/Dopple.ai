"use client";

import { useState } from "react";
import { cn } from "#/lib/cn";

export function PreviewButton() {
  const [preview, setPreview] = useState(false);

  return (
    <button
      className={cn(
        "relative mt-[15px] w-full overflow-hidden rounded-[4px] bg-button md:ml-[15px] md:mt-0 md:w-[150px]",
      )}
      onClick={() => setPreview(prevValue => !prevValue)}
    >
      {preview ? (
        <>
          <div
            className={cn(
              "absolute left-0 top-0 h-[5px] w-full bg-[rgba(4,141,255,.50)]",
            )}
          >
            <div className={cn("h-full w-[30%] bg-blue2")} />
          </div>
          <div
            className={cn(
              "duration-800 flex items-center justify-center space-x-[5.71px] py-[17.69px] text-[13.7px] font-bold text-blue2 transition md:py-[15.5px] md:text-[12px] md:leading-[14px]",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="currentColor"
            >
              <rect width="6" height="15" />
              <rect x="9" width="6" height="15" />
            </svg>
            <span>Stop Playing</span>
          </div>
        </>
      ) : (
        <div
          className={cn(
            "duration-800 flex h-[50px] items-center justify-center space-x-[5.71px] text-[13.7px] font-bold text-blue2 transition md:text-[12px] md:leading-[14px]",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M15.4116 8L0.411621 15.5L0.411622 0.5L15.4116 8Z"
              fill="white"
            />
          </svg>
          <span>Preview Voice</span>
        </div>
      )}
    </button>
  );
}
