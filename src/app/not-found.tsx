"use client";

import { useEffect } from "react";
import Image from "next/image";
import { cn } from "#/lib/cn";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div
      className={cn("relative mx-auto max-w-[1440px] py-[128px] md:py-[167px]")}
    >
      <Image
        className={cn(
          "absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 object-cover",
        )}
        src="/images/error/back.png"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        alt=""
      />
      <div className={cn("relative flex flex-col items-center")}>
        <span
          className={cn(
            "text-[100px] font-extrabold leading-[119.34px] md:text-[150px] md:leading-[179px]",
          )}
        >
          404
        </span>
        <span
          className={cn(
            "text-[20px] leading-[23.87px] md:text-[30px] md:leading-[35.8px]",
          )}
        >
          Dopple Not Found
        </span>
        <button
          className={cn(
            "gradient-button gradient-button-rounded-sm gradient-button-padding-md mt-[30px] h-[40px] px-[45px] text-[14px] font-semibold leading-[16.71px]",
          )}
          onClick={() => reset()}
        >
          Back To Explore
        </button>
      </div>
    </div>
  );
}
